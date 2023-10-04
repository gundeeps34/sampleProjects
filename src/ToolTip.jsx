import React, { useState, useRef, useEffect } from 'react';
import './ToolTip.css';

const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [arrowPosition, setArrowPosition] = useState('top');
  const [position, setPosition] = useState('top');
  const tooltipRef = useRef(null);

  const changePosition = () => {
    const element = tooltipRef.current;

    if (!element) return;

    const margin = 20;

    const elementRect = element.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const isCloseToLeft = elementRect.left - margin <= 0;
    const isCloseToRight = elementRect.right + margin >= viewportWidth;
    const isCloseToTop = elementRect.top - margin <= 0;
    const isCloseToBottom = elementRect.bottom + margin >= viewportHeight;

    if (isCloseToTop) {
      setPosition('bottom');
      setArrowPosition('bottom');
    } else if (isCloseToBottom) {
      setPosition('top');
      setArrowPosition('top');
    }

    if (isCloseToLeft) {
        setArrowPosition('left');
      } else if (isCloseToRight) {
        setArrowPosition('right');
      }
  };

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    const hideTooltipOnScrollOrResize = () => {
      setVisible(false);
    };
  
    window.addEventListener('resize', hideTooltipOnScrollOrResize);
    window.addEventListener('scroll', hideTooltipOnScrollOrResize);
    window.addEventListener('touchmove', hideTooltipOnScrollOrResize);
  
    return () => {
      window.removeEventListener('resize', hideTooltipOnScrollOrResize);
      window.removeEventListener('scroll', hideTooltipOnScrollOrResize);
      window.removeEventListener('touchmove', hideTooltipOnScrollOrResize);
    };
  }, []);
  

  useEffect(
    () => {
        changePosition();
        if(visible){
            if(position == 'top'){
                const tooltipTop = document.querySelector('.tooltip-top');
                tooltipTop.style.opacity = '1';
            }
            else{
                const tooltipBottom = document.querySelector('.tooltip-bottom');
                tooltipBottom.style.opacity = '1';
            }
        }else{
            
        }
    }
  ,[visible])

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onTouchStart={showTooltip} onTouchEnd={hideTooltip}>
      {visible && (
        <div
          id='tooltip'
          ref={tooltipRef}
          className={`tooltip-${position} tooltip-${arrowPosition}`}
          style={{ display: visible ? 'block' : 'none' }}
        >
          <div className={`arrow-${position} arrowSide-${arrowPosition}`} />
          <div className="tooltip-content">{content}</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
