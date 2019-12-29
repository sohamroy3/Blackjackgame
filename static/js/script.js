let blackjackGame=
{
'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
'wins':0,
'losses':0,
'draws':0,
'isStand':false,
'turnsOver':false,

};

//EASY ACCESING OF YOU AND DEALER IN THE OBJECT
const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

//FOR ALL GAME SOUND
const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const lossSound=new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit()
{
    if(blackjackGame['isStand']===false)
    {
        let card=randomCard();
        console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        
        console.log(YOU['score']);

    }
    
}

function randomCard()
{
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer)
{
    if(activePlayer['score'] <= 21)
    {
        let cardImage=document.createElement('img');//create image element in htlm
        cardImage.src=`static/images/${card}.jpg`;//source of the image ???????????????????????????????????????????????????????????????
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal()
{
    if(blackjackGame['turnsOver']===true)
    {
        blackjackGame['isStand']=false;

        // showResult(computeWinner());  IF TWO PLAYER MODE IS ON 
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');


        for(i=0;i<yourImages.length;i++)
       {
          yourImages[i].remove();
        }
     for(i=0;i<dealerImages.length;i++)
     {
        dealerImages[i].remove();
     }
          
     

     YOU['score']=0;
     DEALER['score']=0;

     document.querySelector('#your-blackjack-result').textContent=0;
     document.querySelector('#dealer-blackjack-result').textContent=0;

     document.querySelector('#your-blackjack-result').style.color='#ffffff';
     document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

     //lets play problem fixed

     document.querySelector('#blackjack-result').textContent="Let's Play";
     document.querySelector('#blackjack-result').style.color='black';


     blackjackGame['turnsOver']=true;


    }
   



}

function updateScore(card,activePlayer)
{
    if(card==='A')//As A can be 1 or 11
    {
        if((activePlayer['score'] + blackjackGame['cardsMap'][card][1] )<= 21)
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else//if the card is not A then increment
    {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }   
}

function showScore(activePlayer)
{
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';//color is red now
    }
    else
    {
        document.querySelector(activePlayer['scoreSpan']).textContent =activePlayer['score'];//show the active player score
    }    
}

//HARD STUFFFFFFFFFFFFFFFF
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic()
{
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true)
    {
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    
    
    
 blackjackGame['turnsOver']=true;
 let winner=computeWinner();
 showResult(winner);
    
}

//HARD STUFF COMPLETE ASYNCHRONOUS

//compute winner and return who won ,,,UPDATE THE TABLE

function computeWinner()
{
    let winner;

    if(YOU['score']<=21)
    {
        //higher score than dealer or when dealer bust
        if (YOU['score']>DEALER['score'] || (DEALER['score']>21))
        {
            console.log('you won!');
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score'])
        {
            console.log('you lost');
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score'])
        {
            console.log('you drew');
            blackjackGame['draws']++;
        }
    }

    //when user busts but dealer does not
    else if(YOU['score']>21&&DEALER['score']<=21)
    {
        console.log('you lost');
        winner=DEALER;
    }
    //you and dealer bust
    else if(YOU['score']>21&&DEALER['score']>21)
    {
        console.log('you drew!');
    }
    console.log('winner is',winner);
    return winner;
}


function showResult(winner)
{
    let message,messageColor;

    if(blackjackGame['turnsOver']===true)
    {
        

        if(winner == YOU)
        {
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message ='You won!';
            messageColor='green';
            winSound.play();
        }
        else if(winner===DEALER)
        {
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message='You lost!';
            messageColor='red';
            lossSound.play();
        }
        else
        {
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message='YOU drew!';
            messageColor='black';

        }


        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;//??????????????????????????????????????????????
    }

}

