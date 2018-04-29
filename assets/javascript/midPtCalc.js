//midPtCalc(): consumes two geographical points as objects with respective lats and lngs, returns a midpoint with a lat and lng 

/*PseudoCode For MidPoint Calculation given N number of points with latitudes and longitudes */

/**Simple Average of Input Points */
/**This method finds a simple average latitude and longitude for the locations in 'Your Places'. This is equivalent to finding a midpoint on a flat rectangular projection map. When the distance between locations is less than 250 miles (400 km), this method gives a close approximation to the true geographic midpoint in Method A. */



function midPtCalc(ptA, ptB){
    //Initialize empty Lat and Lng for MidPt
    var midPtLat;
    var midPtLng;

    //Extract Lat and Lng from input pts
    var ptALat = ptA.lat;
    var ptBLat = ptB.lat;

    var ptALng = ptA.lng;
    var ptBLng = ptB.lng;

    //Calc Simple Avg of Coordinates
    midPtLat = (ptALat + ptBLat)/2;
    midPtLng = (ptALng + ptBLng)/2;
    
    var midPt = {lat: midPtLat, lng: midPtLng};
    return midPt;
};//End midPtCalc();