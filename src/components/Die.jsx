import React from "react"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
  }
  return (
    <div className="die" style={styles} onClick={props.onHeld}>
      <h2 className="die--num">{props.value}</h2>
    </div>
  )
}