import React from 'react';
import "./styles.css";
import { useState } from 'react';

function CoinInfo({ heading, desc }) {
  const [flag, setFlag] = useState(false); 

  if (!desc) return null;

  const shortDesc = desc.slice(0, 300) + "<span style='color:var(--gray-text)'> Read More...</span>";
  const longDesc = desc + "<span style='color:var(--gray-text)'> Read Less...</span>";

  return (
      <div className="grey-wrapper" >
          <h2 className="coin-info-heading">{heading}</h2>
          {desc.length > 300 ? (
              <p
                  onClick={() => setFlag(!flag)}
                  className="coin-info-desc"
                  dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
              />
          ) : (
              <p dangerouslySetInnerHTML={{ __html: desc }} />
          )}
      </div>
  );
}
export default CoinInfo;