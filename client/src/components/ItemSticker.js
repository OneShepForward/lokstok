import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import QRCode from 'qrcode.react';

import logo from "../image/lokstok_cover_photo.png";

function ItemSticker({ item }) {
 

  return (
    <div className="ItemSticker">
      <div className="sticker-container">
        <div className='qr-code'>
          <QRCode value={`lokstok.herokuapp.com/items/${item.id}`} />
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
