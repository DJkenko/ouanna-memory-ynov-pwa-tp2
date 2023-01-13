import './SingleCard.css'


export default function SingleCard(props ) {

    const handleClick = () => {
        if(!props.disable) { 
            props.handleChoice(props.card)
        }
    }
    return (
        <div className='card'>
              <div className={props.flipped ? 'flipped' : ''}>
                <img className='front' src={props.card.src} alt="card front" />
                <img 
                    className='back' 
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="card back" 
                />
              </div>
          </div>
    )
}