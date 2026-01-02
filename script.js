const characterDiv = document.querySelector(".player-character-div");
const image_div_male = document.querySelectorAll(".male .img");
const image_div_female = document.querySelectorAll(".female .img");
const startBtn = document.querySelector(".start-btn");
const mainMenuDiv = document.querySelector(".main-menu-div");
const playScreen = document.querySelector(".play-screen");
const playerOneDisplay = document.querySelector(".player-one-display");
const playerTwoDisplay = document.querySelector(".player-two-display");
const cells = document.querySelectorAll("[data-x]");
const turnIndicator = document.querySelector(".turn-indicator");
const displayError = document.querySelector(".display-error");


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
            gameArr[i][j] = {ref: undefined, available: true};
        }
    }
    }

    //function to add the respective player's symbol on the board
    let additionPossible = true;
    let availablilityOfPreviousCell = true;
    function addSymbol(attackingPlayerRef, row, col, cell)
    {
        if(!(gameArr[row][col].ref) && gameArr[row][col].available && additionPossible)
        {
            const cellImg = cell.querySelector("img");
            cellImg.src = attackingPlayerRef.src;
            gameArr[row][col].ref = attackingPlayerRef; 
            gameArr[row][col].available = false; 
            availablilityOfPreviousCell = true; 
        }
        else{availablilityOfPreviousCell = false;}

        if(win(attackingPlayerRef, row, col) === true)
        {
            turnIndicator.textContent = attackingPlayerRef.getAttribute("alt") + " Wins!";
            //condition to stop the play
            additionPossible = false;
        }

        else if(draw())
        {
            turnIndicator.textContent = "It's a draw!";
            additionPossible = false;
        }
    }

    function win(player, row, col)
    {
        if(gameArr[0][0].ref == gameArr[1][1].ref && gameArr[1][1].ref == gameArr[2][2].ref && gameArr[2][2].ref == player
           || gameArr[0][2].ref == gameArr[1][1].ref && gameArr[1][1].ref == gameArr[2][0].ref && gameArr[2][0].ref == player)
        {
            additionPossible = false;
            return true;
        }

        let countRow = 0;
        let countColumn = 0;
        for(let i=0; i<3; i++)
        {
            if(gameArr[row][i].ref === player)
            {
                countRow++;
            }
            if(gameArr[i][col].ref === player)
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
                if(!(gameArr[i][j].ref))
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

    function indicateTurn(playerName)
    {
        if(additionPossible && availablilityOfPreviousCell)
        {
        turnIndicator.textContent = playerName + "'s turn";
        }

    }

    function getAvailabilityOfPreviousCell()
    {
        return availablilityOfPreviousCell;
    }

    setBoard();
    return{addSymbol, indicateTurn, getAvailabilityOfPreviousCell};
}

(function gameController()
{
    let playerMale, playerFemale;

    image_div_male.forEach((img_div)=>{
        img_div.addEventListener("click",(event)=>{
            image_div_male.forEach((div)=>{
                div.classList.remove("targeted");
            })
            playerMale = event.target;
            event.currentTarget.classList.add("targeted");
        })
    });

    image_div_female.forEach((img_div)=>{
        img_div.addEventListener("click",(event)=>{
            image_div_female.forEach((div)=>{
                div.classList.remove("targeted");
            });
            playerFemale = event.target;
            event.currentTarget.classList.add("targeted");
        })
    });

        let playerAttacking;

    startBtn.addEventListener("click", ()=>{
        if(playerMale &&  playerFemale)
        {
        playerAttacking = playerMale;
        mainMenuDiv.classList.toggle("hide-display");
        playScreen.classList.toggle("hide-display");

        addAvatarAndName(playerMale, playerFemale);

        turnIndicator.textContent = playerAttacking.getAttribute("alt") + "'s turn!";

        }

        else
        {
            displayError.style.display = "block";

            setTimeout(()=>{
                displayError.style.display = "none";
            }, 5000);
        }
    })


    let game = gameBoard();

    cells.forEach((cell)=>{
        cell.addEventListener("click", (event)=>{
            game.addSymbol(playerAttacking, +(cell.dataset.x) - 1, +(cell.dataset.y) - 1, cell);
            if(game.getAvailabilityOfPreviousCell() == true)
            {
            playerAttacking = (playerAttacking == playerMale) ? playerFemale : playerMale;
            }
            game.indicateTurn(playerAttacking.getAttribute("alt"));
        })
    });

    function addAvatarAndName(maleRef, femaleRef)
    {
        const playerOneImg = playerOneDisplay.querySelector("img");
        const maleSrc = maleRef.getAttribute("src");
        playerOneImg.setAttribute("src", maleSrc);

        const playerTwoImg = playerTwoDisplay.querySelector("img");
        const femaleSrc = femaleRef.getAttribute("src");
        playerTwoImg.setAttribute("src", femaleSrc);

        const playerOneNameSpan = playerOneDisplay.querySelector(".player-name");
        const playerOneName = maleRef.getAttribute("alt");
        playerOneNameSpan.textContent = playerOneName;

        const playerTwoNameSpan = playerTwoDisplay.querySelector(".player-name");
        const playerTwoName = femaleRef.getAttribute("alt");
        playerTwoNameSpan.textContent = playerTwoName;
    }
})();



