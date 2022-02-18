import '../style/App.css';

import QRCode from 'qrcode.react';

import logo from "../image/lokstok_cover_photo.png";

function ItemSticker({ item }) {
 
// const app_url = "lokstok.herokuapp.com"

  return (
    <div className="ItemSticker">
      <div className="sticker-container" id={`sticker-${item.id}`}>
        <div className='qr-code'>
          <QRCode value={`items/${item.id}`} />
          {/* This is the code I was using to generate the QR code until I hit a 
          proxy issue. */}
          {/* <QRCode value={`${app_url}/items/${item.id}`} /> */}
        </div>
        <div className='text'>
          <p>Item #: {item.id}</p>
          <p>Part #{item.part.id}: {item.part.description} </p>
        </div> 
        <div className='sticker-imgbox'>
          <img src={logo} alt="LokStok logo" className='center-fit' />
        </div>
      </div>
    </div>
  );
}

export default ItemSticker;
