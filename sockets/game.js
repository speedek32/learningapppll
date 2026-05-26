const rooms = new Map();

function genCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

module.exports = function initGame(io) {
  io.on('connection', socket => {
    let myRoom = null;

    // ── Create room ──────────────────────────────────────────────
    socket.on('create_room', ({ username, categoryName, questions }) => {
      const code = genCode();
      rooms.set(code, {
        code, categoryName,
        questions: [...questions].sort(() => Math.random() - 0.5).slice(0, 15),
        players: { [socket.id]: { username, score: 0, answered: 0, done: false } },
        status: 'waiting'
      });
      myRoom = code;
      socket.join(code);
      socket.emit('room_created', { code });
    });

    // ── Join room ────────────────────────────────────────────────
    socket.on('join_room', ({ username, code }) => {
      const room = rooms.get(code.toUpperCase());
      if (!room)          return socket.emit('room_error', 'Nie znaleziono pokoju z tym kodem.');
      if (room.status !== 'waiting') return socket.emit('room_error', 'Gra już trwa.');
      if (Object.keys(room.players).length >= 2) return socket.emit('room_error', 'Pokój jest pełny.');

      room.players[socket.id] = { username, score: 0, answered: 0, done: false };
      myRoom = code.toUpperCase();
      socket.join(myRoom);

      const playerList = Object.values(room.players).map(p => p.username);
      io.to(myRoom).emit('player_joined', { players: playerList });

      // Start countdown when 2 players connected
      room.status = 'countdown';
      let n = 3;
      io.to(myRoom).emit('countdown', n);
      const t = setInterval(() => {
        n--;
        if (n > 0) {
          io.to(myRoom).emit('countdown', n);
        } else {
          clearInterval(t);
          room.status = 'playing';
          io.to(myRoom).emit('game_start', { questions: room.questions, category: room.categoryName });
        }
      }, 1000);
    });

    // ── Answer submitted ─────────────────────────────────────────
    socket.on('answer', ({ idx, correct }) => {
      const room = rooms.get(myRoom);
      if (!room?.players[socket.id]) return;
      const p = room.players[socket.id];
      if (correct) p.score++;
      p.answered = idx + 1;
      io.to(myRoom).emit('score_update', playerScores(room));
    });

    // ── Player finished all questions ────────────────────────────
    socket.on('done', ({ score }) => {
      const room = rooms.get(myRoom);
      if (!room?.players[socket.id]) return;
      room.players[socket.id].score = score;
      room.players[socket.id].done  = true;

      if (Object.values(room.players).every(p => p.done)) {
        room.status = 'finished';
        const ranked = Object.values(room.players)
          .sort((a, b) => b.score - a.score);
        io.to(myRoom).emit('game_over', {
          results: ranked.map(p => ({ username: p.username, score: p.score })),
          total: room.questions.length
        });
        setTimeout(() => rooms.delete(myRoom), 120_000);
      } else {
        socket.emit('waiting_opponent');
        io.to(myRoom).emit('score_update', playerScores(room));
      }
    });

    // ── Disconnect ───────────────────────────────────────────────
    socket.on('disconnect', () => {
      if (!myRoom) return;
      const room = rooms.get(myRoom);
      if (!room) return;
      delete room.players[socket.id];
      if (Object.keys(room.players).length === 0) {
        rooms.delete(myRoom);
      } else {
        io.to(myRoom).emit('opponent_left');
      }
    });

    function playerScores(room) {
      return Object.values(room.players).map(p => ({
        username: p.username, score: p.score, answered: p.answered
      }));
    }
  });
};
