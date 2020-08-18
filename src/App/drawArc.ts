import { drawMethods } from "declarative-canvas";

export const fillAndStroke = (context, drawMethod) => {
  if (
    drawMethod === drawMethods.FILL ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.fill();
  }
  if (
    drawMethod === drawMethods.STROKE ||
    drawMethod === drawMethods.FILL_AND_STROKE
  ) {
    context.stroke();
  }
};

const drawArc = (
  context,
  {
    x,
    y,
    radius,
    drawMethod = drawMethods.FILL,
    startAngle = 0,
    endAngle = Math.PI * 2,
  }
) => {
  context.beginPath();
  context.moveTo(x, y);
  context.arc(x, y, radius, startAngle, endAngle);
  fillAndStroke(context, drawMethod);
};

export default drawArc;
