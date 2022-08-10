function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if ((value <= 0) & (this.monsterHealth <= 0)) {
        //draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // player lose
        this.winner = 'Monster';
      }
    },
    monsterHealth(value) {
      if ((value <= 0) & (this.playerHealth <= 0)) {
        //draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // monster lose
        this.winner = 'Player';
      }
    },
  },
  methods: {
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      (this.winner = null), (this.logMessages = []);
    },
    attackMonster() {
      this.currentRound++;
      var attackValue = getRandomNumber(12, 5);
      this.monsterHealth -= attackValue;
      this.addLogMessage('Player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      var attackValue = getRandomNumber(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessage('Monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      var attackValue = getRandomNumber(25, 10);
      this.monsterHealth -= attackValue;
      this.addLogMessage('Player', 'special-attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      var healValue = getRandomNumber(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('Player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'Monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionKey: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
