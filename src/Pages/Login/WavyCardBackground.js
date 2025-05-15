import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WavyCardBackground = ({ height = 160, style }) => {
  return (
    <Svg
      width={width - 40}
      height={height}
      viewBox={`0 0 ${width - 40} ${height}`}
      style={style}
    >
      <Path
        d={`
          M0 0 
          Q ${width * 0.25} ${height * 0.4}, ${width * 0.5 - 20} ${height * 0.2} 
          Q ${width * 0.75} ${-height * 0.2}, ${width - 40} ${height * 0.6} 
          L ${width - 40} ${height}
          L 0 ${height}
          Z
        `}
        fill="#FFF1EB"
      />
    </Svg>
  );
};

export default WavyCardBackground;
