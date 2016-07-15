// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        game.load.image('bird', 'assets/bird.png')
    },

    create: function() {
        game.stage.backgroundColor = 'navyBlue'
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird= game.add.sprite(100,254, 'bird')
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);
      this.pipes = game.add.group();
    },

    update: function() {
      if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();
      // This function is called 60 times per second
      // It contains the game's logic
    },

    jump: function(){
      this.bird.body.velocity.y=-306;
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
      var hole = Math.floor(Math.random()+5)+1
      for (var i = 0; i < 8; i++)
        if(i != hole && i != hole +1 && i != hole +2  ){
          this.addOnePipe(400, i * 60 + 10);
        }
 },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
