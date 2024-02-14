
const ValentineMessage = ({explode}) => {
  return (
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          <p className="val-text">
            {explode ?
            'happy valentine\'s day ❤️ i love you!' :
            'dear megan, will you be my valentine once again? ❤️'
            }
            </p>
        </div>
  );
};

export default ValentineMessage;
