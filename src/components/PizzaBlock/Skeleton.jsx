import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="134" r="134" /> 
    <rect x="0" y="279" rx="15" ry="15" width="280" height="24" /> 
    <rect x="0" y="326" rx="10" ry="10" width="280" height="80" /> 
    <rect x="8" y="436" rx="10" ry="10" width="90" height="30" /> 
    <rect x="120" y="427" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton
