function gameBoard()
{
    let gameArr = [];
    let row = 3;
    let col = 3;
    
    //Create a static TicTacToe board
    function setBoard(){ 
        gameArr = [];
    for(let i=0; i<row; i++)
    {
        gameArr[i] = [];
        for(let j=0; j<col; j++)
        {
            gameArr[i][j] = 0;
        }
    }
    }

    //function to add the respective player's symbol on the board
    let additionPossible = true;
    function addSymbol(player, row, col)
    {
        if(gameArr[row][col] === 0 && additionPossible)
        {
            gameArr[row][col] = player;
            //player1 = 1, player2 = 2, empty = 0
        }

        if(win(player, row, col) === true)
        {
            console.log(`Player ${player} wins!`);
            //condition to stop the play
            additionPossible = false;
        }

        else if(draw())
        {
            console.log("The match is a draw.");
            additionPossible = false;
        }
    }

    function win(player, row, col)// 1 0 2
    {
        if(gameArr[0][0] == gameArr[1][1] && gameArr[1][1] == gameArr[2][2] && gameArr[2][2] == player
            || gameArr[0][2] == gameArr[1][1] && gameArr[1][1] == gameArr[2][0] && gameArr[2][0] == player)
        {
            return true;
        }

        let countRow = 0;
        let countColumn = 0;
        for(let i=0; i<3; i++)
        {
            if(gameArr[row][i] === player)
            {
                countRow++;
            }
            if(gameArr[i][col] === player)
            {
                countColumn++;
            }
            if(countColumn == 3 || countRow == 3)
            {
                additionPossible = false;
                return true;
            }
        }
    }

    function draw()
    {
        let emptyCount = 0;
        for(let i=0; i<row; i++)
        {
            for(let j=0; j<col; j++)
            {
                if(!gameArr[i][j])
                {
                    emptyCount++;
                }
            }
        }
        if(emptyCount === 0)
        {
            additionPossible = false;
            return true;
        }
    }

    function displayGameArr()
    {
        console.log("------------------------------");
        for(let i=0; i<3; i++)
        {
            console.log(gameArr[i]);
        }
    }

    function gameOver()
    {
        if(!additionPossible) {
            setBoard();
            return true;
    }
    }

    setBoard();
    return{displayGameArr, addSymbol, win, draw, gameOver};
}

(function gameController()
{

    let player = 1;
    let playerTargetCell;
    let inputRow;
    let inputColumn;
    
    let game = gameBoard();

    while(!game.gameOver())
    {
        game.displayGameArr();

        playerTargetCell = prompt(`Player${player}'s turn:`);
        
        inputRow = (+playerTargetCell[0]) - 1;
        inputColumn = (+playerTargetCell[2]) - 1;

        if(inputColumn > 2 || inputColumn < 0 || inputRow < 0 || inputRow > 2){
            console.log("--------------------------------------");
            console.log("Invalid row/column input!");
            continue;
        }
        game.addSymbol(player, inputRow, inputColumn);
        if(player == 1) 
        {
            player = 2;
        }
        else
        {
            player = 1;
        }
    }

    
    
})();



