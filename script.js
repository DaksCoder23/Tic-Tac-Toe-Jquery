$(document).ready(function(){
    let currentPlayer='X'
    let gameBoard=['','','','','','','','',''];
    let gameActive= true;

    const winningCombos=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    $('.cell').click(function(){
        const index=$(this).data('index');
        if(gameBoard[index]===''&&gameActive){
            gameBoard[index]=currentPlayer;
            $(this).text(currentPlayer);
            if(checkWin()){
                $('#status').text(`Player ${currentPlayer} wins!`);
                gameActive=false;
            }
            else if(checkDraw()){
                $('#status').text("It's a draw!");
                gameActive=false;
            }else{
                currentPlayer=currentPlayer==='X'?'O':'X';
                $('#status').text(`Player ${currentPlayer}'s turn`);
            }
        }

    });

    function checkWin(){
        return winningCombos.some(combo =>{
            if(gameBoard[combo[0]]!==''&&
                gameBoard[combo[0]]===gameBoard[combo[1]]&&
                gameBoard[combo[1]]===gameBoard[combo[2]]){
                    combo.forEach(index=>{
                        $(`.cell[data-index="${index}"]`).addClass('winning-cell');
                    });
                    return true;
                }
                return false;
            
        });
    }
    function checkDraw(){
        return gameBoard.every(cell=>cell!=='');
    }
    $('#restart').click(function() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        $('.cell').text('').removeClass('winning-cell');
        $('#status').text("Player X's turn");
    });



});
