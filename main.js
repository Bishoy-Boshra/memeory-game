// get the button to start Game and add The name to Game
document.querySelector( ".control-button span" ).addEventListener( "click",
    function ()
    {
        // this prompt to write the name 
        let yourname = prompt( "what is your name" )
        if ( yourname == null || yourname == "" )
        {
            // chack if prompt is empty
            document.querySelector( ".container .name span" )
                .innerHTML = "Unknown"
        } else
        {
            // if prompt not empty add name to header .name span
            document.querySelector( ".container .name span" )
                .innerHTML = yourname[ 0 ].toUpperCase()
                + yourname.slice( 1, );
        }

        // delete the button from body and start Game 
        document.querySelector( ".control-button" ).remove()

        // start Timer to Game 
        startcounter()

        //// make all itme flipped for 1s
        blocks.forEach( block => block.classList.add( "is-flipped" ) )
        setTimeout( visibleBlock, 3000 );
    } );

//===========================================(create random number )
// Collect info and set time to rotate blocks

// Effect duration
let duration = 500;

// select Blocks Container
let blocks_container = document.querySelector( ".memory-game-blocks" );

// create Array from blocks children 
let blocks = Array.from( blocks_container.children )

// create Range from Array.lenght  Keys 
// let odrder_range = [ ...Array( blocks.length ).keys() ];

// create Range by deferent way 
let odrder_range = Array.from( Array( blocks.length ).keys() )

// console.log( odrder_range )
shuffle( odrder_range )
// console.log( odrder_range )

// make random number from order range
// shuffle function 
function shuffle ( array )
{
    let current = array.length,
        temp,
        random;

    while ( current > 0 )
    {
        // Get Random Number
        random = Math.floor( Math.random() * current )

        // Descease lenght By one 
        current--;

        // [ 1 ] save current Element in stash(temp)
        temp = array[ current ]

        // [ 2 ] current  Element = random Element
        array[ current ] = array[ random ]

        // [ 3 ] random Element = stach( temp )
        array[ random ] = temp
    }
    return array;
}

// Add order Css property to Game Blocks
blocks.forEach( ( block, index ) =>
{
    // Add Css Order to Blocks to make it random 
    block.style.order = odrder_range[ index ];

    // Add Class is-flipped to selected block
    block.addEventListener( "click", function ()
    {
        flipBlock( block )
    } )

} )

//================================(Create the flip block function )

function flipBlock ( selectedBlock )
{
    // add class is flipped to block 
    selectedBlock.classList.add( "is-flipped" )

    // collect flippes card
    let allflipcards = blocks.filter( ( curr_block ) => curr_block.classList.contains( "is-flipped" ) )

    // if there is two selected blocks
    if ( allflipcards.length === 2 )
    {
        console.log( "there are two flipped cardes" )

        // stop clicking function
        stopclicking()

        // check Matched Block function 
        checkMatching( allflipcards[ 0 ], allflipcards[ 1 ] )
    };

}

function stopclicking ()
{
    // Add Class no Clicking on main container 
    blocks_container.classList.add( "no-clicking" )

    // delete class no ckicking after duration
    setTimeout( () =>
    {
        blocks_container.classList.remove( "no-clicking" )
    }, duration )
}

function checkMatching ( first, second )
{
    let tries = document.querySelector( ".container .tries span" )
    if ( first.getAttribute( "data-game" ) ===
        second.getAttribute( "data-game" ) )
    {
        // if matching wrong remove is-flipped from blocks  and 
        // Add has-matching in blocks
        first.classList.remove( "is-flipped" )
        second.classList.remove( "is-flipped" )

        first.classList.add( "has-matching" )
        second.classList.add( "has-matching" )
        document.querySelectorAll( "audio" )[ 2 ].play();

        winner()

    } else
    {
        // if matching wrong remove is-flipped from blocks 
        document.querySelectorAll( "audio" )[ 3 ].play();
        setTimeout( () =>
        {
            first.classList.remove( "is-flipped" )
            second.classList.remove( "is-flipped" )

        }, duration );

        // add one wrong to tries 
        if ( parseInt( tries.innerHTML ) === 10 )
        {
            //. show blockd before game end 
            tries.innerHTML = parseInt( tries.innerHTML ) + 1
            blocks.forEach( block => block.classList.add( "is-flipped" ) )
            setTimeout( game_over, 2000 );
        } else
        {
            tries.innerHTML = parseInt( tries.innerHTML ) + 1
        }
    }
}


// =======================================(make all itme flipped for 1s)
function visibleBlock ()
{
    blocks.forEach( block => block.classList.remove( "is-flipped" ) )
}

function game_over ()
{
    document.querySelector( ".game-over" ).style.display = "block"
    document.querySelectorAll( "audio" )[ 1 ].play();
}


// ========================================== (Create Timer to the Game) 
let time = document.querySelectorAll( ".timer span" )[ 1 ];
let minute = document.querySelectorAll( ".timer span" )[ 0 ];

let counter = 0;
function timecountup ()
{
    if ( ~~minute.innerHTML === 2 )
    {
        game_over()
        clearInterval( counter )
    } else
    {
        time.innerHTML = ~~time.innerHTML + 1;
    }
    if ( ~~time.innerHTML === 60 )
    {
        time.innerHTML = 00
        minute.innerHTML = ~~minute.innerHTML + 1
    }
}

function startcounter ()
{
    counter = setInterval( timecountup, 1000 )
}

// relood to play again

document.getElementsByTagName( "button" )[ 0 ].addEventListener( "click", () => location.reload() );
// [ 1 ].addEventListener( "click", () => location.reload() );

// ===================================(in winner )
function winner ()
{

    let mathch = document.querySelectorAll( ".has-matching" )
    console.log( mathch.length )
    console.log( blocks.length )
    if ( mathch.length === blocks.length )
    {
        clearInterval( counter )
        let num = document.querySelector( ".container .timer" ).textContent;
        document.querySelector( ".time-token" ).textContent = `You take ${ num } Seconds to resolve it `
        setTimeout( () =>
        {
            document.querySelector( ".congratulation" ).style.display = "block";
            document.querySelectorAll( "audio" )[ 0 ].play();
        }, 1000 );
    }
}
// relood to play again
document.addEventListener( "click", ( e ) =>
{
    console.log( e.target.TagName )
    if ( e.target.TagName == "button" )
    {
        location.reload()
    }
} )

document.querySelectorAll( "button" )[ 1 ].addEventListener( "click", () => location.reload() )
