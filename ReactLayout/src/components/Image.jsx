const Image = ({ flag, size = "300px" , hieght = "70%", title = "Happy",designation="Person"}) => {
    let pic;
    switch(flag){
        case 1: 
        pic = '/assets/p4.jpeg';
        break;
        case 2:
         pic = '/assets/p8.jpeg';
         break;
    }

    const imageDivStyle = {
        padding: '6% 4% 8% 0',
        display: 'flex',
        flexDirection: 'row',
        itemsAlign: 'center',
        width:{size},
        height:{hieght},
      };

    const imageStyle = {
        objectFit: "cover", borderRadius: "8%",
        boxShadow: '3px 1px px rgba(0, 0, 0, 0.5)',
    };

    const titleHeadings = {
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: 'sans-serif',
    };

    const designationStyle = {
        fontFamily: 'sans-serif',
        color: "#c6c6c6",
    };
   
  return (
    <div style={imageDivStyle}>
        <div>
            <img
            width={size}
            height={hieght}
            src={pic}
            style={imageStyle}
            alt="SupposedImage"
            />
            <p style={titleHeadings}>{title}</p>
            <p style={designationStyle}>{designation}</p>
        </div>
    </div>
  );
};

export default Image;
