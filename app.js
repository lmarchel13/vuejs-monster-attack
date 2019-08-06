new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    playerHPColor: "green",
    monsterHealth: 100,
    monsterHPColor: "green",
    gameIsRunning: false,
    maxPlayerDamage: 10,
    minPlayerDamage: 3,
    maxMonsterDamage: 8,
    minMonsterDamage: 3,
    turns: [],
    specialAttackCounter: 2
  },
  methods: {
    updateSpecialAttack() {
      setTimeout(() => {
        this.specialAttackCounter++;
        this.turns.unshift({
          isPlayer: true,
          text: "SPECIAL ATTACK RELOADED!"
        });
      }, 5000);
    },
    updatePlayerHP: function() {
      if (this.playerHealth >= 70) return (this.playerHPColor = "green");
      if (this.playerHealth >= 30) return (this.playerHPColor = "yellow");
      return (this.playerHPColor = "red");
    },
    updateMonsterHP: function() {
      if (this.monsterHealth >= 70) return (this.monsterHPColor = "green");
      if (this.monsterHealth >= 30) return (this.monsterHPColor = "yellow");
      return (this.monsterHPColor = "red");
    },
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.monsterHPColor = "green";
      this.playerHPColor = "green";
      this.specialAttackCounter = 2;
    },
    attack: function() {
      const playerDamage = this.calculateDamage(
        this.minPlayerDamage,
        this.maxPlayerDamage
      );
      this.monsterHealth -= playerDamage;

      this.updateMonsterHP();

      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${playerDamage}`
      });

      if (this.isGameOver()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function() {
      if (this.specialAttackCounter === 0) {
        alert("Out of special attacks... 10 seconds to charge!");
        this.updateSpecialAttack();
        return;
      }

      this.specialAttackCounter--;

      const damage = this.calculateDamage(
        this.minPlayerDamage * 2,
        this.maxPlayerDamage * 2
      );

      this.monsterHealth -= damage;

      this.updateMonsterHP();

      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster HARD for ${damage}`
      });

      if (this.isGameOver()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      this.updatePlayerHP();

      this.turns.unshift({
        isPlayer: true,
        text: `Player healed yourself!`
      });
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.turns = [];
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    isGameOver: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }

      return false;
    },
    monsterAttack: function() {
      const damage = this.calculateDamage(
        this.minMonsterDamage,
        this.maxMonsterDamage
      );
      this.playerHealth -= damage;

      this.updatePlayerHP();

      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });

      this.isGameOver();
    }
  }
});
