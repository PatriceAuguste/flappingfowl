// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird= game.add.sprite(100,254, 'bird')
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
    { font: "30px Arial", fill: "#ffffff" });

        var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);
      this.pipes = game.add.group();
    },

    update: function() {
      if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();

    game.physics.arcade.overlap(
    this.bird, this.pipes, this.restartGame, null, this);
    },

    jump: function(){
      this.bird.body.velocity.y = -350;
    },

    restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
  },
    addOnePipe: function(x, y) {
      var pipe = game.add.sprite(x, y, 'pipe');
      this.pipes.add(pipe);
      game.physics.arcade.enable(pipe);
      pipe.body.velocity.x = -200;
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
},
      addRowOfPipes: function() {
      var hole = Math.floor(Math.random() * 5)+1;
      for (var i = 0; i < 8; i++);
        if(i != hole && i != hole +1 && i != hole +2  );
          this.addOnePipe(400, i * 60 + 10);
    this.score += 1;
    this.labelScore.text = this.score;
 },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
