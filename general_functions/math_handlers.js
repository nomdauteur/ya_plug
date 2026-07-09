var EPSILON=0.01;

function randomInt(max) {
    return Math.floor(Math.random()*(max+1));
}

function overlap(a1,a2,b1,b2) {
    if ((b1<a1&&a1<b2) || (b1<a2&&a2<b2) || (a1<b1&&b1<a2) || (a1<b2&&b2<a2)) return true;
    return false;
}

function pointInCircle(point_x, point_y, circle_x, circle_y, circle_rad) {
    return (point_x-circle_x)*(point_x-circle_x)+(point_y-circle_y)*(point_y-circle_y) <= circle_rad*circle_rad;
}

function pointInSegment(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    var delta_lambda=((point_x-start_point_x)/(end_point_x-start_point_x) - (point_y-start_point_y)/(end_point_y-start_point_y));

    if ((-EPSILON<=end_point_x-start_point_x) && (end_point_x-start_point_x<=EPSILON)) {
        return (-EPSILON<=point_x-end_point_x && point_x-end_point_x <= EPSILON) && (Math.min(start_point_y,end_point_y)<= point_y && Math.max(start_point_y,end_point_y) >= point_y);
    }

    if ((-EPSILON<=end_point_y-start_point_y) && (end_point_y-start_point_y<=EPSILON)) {
        return (-EPSILON<=point_y-end_point_y && point_y-end_point_y <= EPSILON) && (Math.min(start_point_x,end_point_x)<= point_x && Math.max(start_point_x,end_point_x) >= point_x);
    }

    return (
        (-EPSILON <=delta_lambda) && (delta_lambda <=EPSILON)
        && ((point_x-start_point_x)/(end_point_x-start_point_x) >= 0)
        && ((point_x-start_point_x)/(end_point_x-start_point_x) <= 1)
    );
}

function pointLineDistanceSquared(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    return ((point_x - start_point_x)*(end_point_y-start_point_y) - (point_y - start_point_y)*(end_point_x-start_point_x)) * ((point_x - start_point_x)*(end_point_y-start_point_y) - (point_y - start_point_y)*(end_point_x-start_point_x)) / ((end_point_x-start_point_x)*(end_point_x-start_point_x)+(end_point_y-start_point_y)*(end_point_y-start_point_y));
}

function pointLineProj(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    var lambda = ((end_point_x-start_point_x) *(point_x-start_point_x) + (end_point_y-start_point_y) *(point_y-start_point_y)) / ((end_point_x-start_point_x)*(end_point_x-start_point_x)+(end_point_y-start_point_y)*(end_point_y-start_point_y));
    return {"x":start_point_x+lambda*(end_point_x-start_point_x),
        "y":start_point_y+lambda*(end_point_y-start_point_y)};
}

function lineInCircle(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y, circle_rad) {

    if (pointInCircle(start_point_x, start_point_y, circle_x, circle_y, circle_rad) || pointInCircle(end_point_x, end_point_y, circle_x, circle_y, circle_rad))
    {
        return true;
    }
    var centerLineProjection=pointLineProj(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y);
    if ((pointLineDistanceSquared(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y) <= circle_rad*circle_rad) && (pointInSegment(start_point_x, start_point_y, end_point_x, end_point_y,centerLineProjection.x,centerLineProjection.y))) {

        return true;
    }

    return false;

}

function incrementAngle(angle,delta) {
    return (angle+delta+2*Math.PI)%(2*Math.PI);
}

function pointsDistance(a, b) {
    var AB = {"x":b.x-a.x,"y":b.y-a.y};
    return Math.sqrt(AB.x*AB.x+AB.y*AB.y);
}