let setA = [];
let setB = [];
let relation = [];

const removeDuplicates = function(ar1) {

    let newArray = [];

    let index = 0;

    for(let i = 0; i < ar1.length; i++) {

       if(contains(ar1[i], newArray)) continue;
       else newArray[index++] = ar1[i];
    }

    return newArray;
}

const arrayEquals = function(ar1, ar2) {

    if(ar1.length !== ar2.length) return false;

    for(i = 0; i < ar1.length; i++) {
        if(ar1[i] !== ar2[i]) return false;
    }

    return true;
}

const converStringToArray = function(pair) {

    pair = pair.replaceAll("{","").replaceAll("(","").replaceAll(")","").replaceAll("}","")

    pair = pair.split(",");

    let numberArray = [];

    for(let i = 0; i < pair.length; i ++) {
        numberArray[i] = Number(pair[i]);
    }

    return numberArray;
}


const convertStringTo2DArray = function(relation) {

    let splitRelation = relation.split("),");

    let relationArray = [];

    let index = 0;

    for(const pair of splitRelation) {
        relationArray[index++] = converStringToArray(pair);
    }

    return relationArray;
}

const getLargestLength = function (ar1) {

    let largestLength = 0;

    for(const ar of ar1) {
        let coercion = ar + "";
        if(coercion.length > largestLength) {
            largestLength = coercion.length;
        }
    }

    return largestLength;
}

const changeLength = function (ar1) {

    let newArray = [];
    let largestLength = 0;

    for(const ar of ar1) {

        let coercion = ar + "";
        
        if(coercion.length > largestLength) {
            largestLength = coercion.length;
        }
    }

    for(let i = 0; i < ar1.length; i++) {

        let coercion = ar1[i] + ""; 

        while(coercion.length < largestLength){
            coercion = " " + coercion;
        }
        
        newArray[i] = coercion;
    }
    
    return newArray;
}

const contains = function(ar1, relation) {

    for(let i = 0; i < relation.length; i++) {
        if(arrayEquals(ar1,relation[i])) return true;
    }

    return false;
}

const tableMap = function (set1, set2, relation) {

    let map = "";

    let relation2D = removeDuplicates(convertStringTo2DArray(relation));
    let max1Length = getLargestLength(set1);

    for(let i = 0; i < set2.length; i++) {
        
        if(i === 0) {
            map += "  ";
            for(let j = 0; j < max1Length; j++) {
                map += " ";
            }
        }

        map += ` ${set2[i]}  `;
    }

    map += "\n";

    let modifiedArray = changeLength(set1);

    for(let i = 0; i < set1.length; i++) {

        map += `${modifiedArray[i]}`;
        
        for(let j = 0; j < set2.length; j++) {

            let tempArray = [set1[i], set2[j]];

            let lengthTemp = (set2[j] + "").length

            if(contains(tempArray,relation2D)){

                for(let k = 1; k < lengthTemp; k++) {
                    map += " ";
                }
                map += "   x";
            } else {

                for(let k = 1; k < lengthTemp; k++) {
                    map += " ";
                }
                map += "    ";
            }
        };

        map += "\n";
    }

    document.querySelector("#main-output-h1").textContent = map.replaceAll(" ","\u2800");
    console.log(map);
}

document.querySelector("#main-button").addEventListener("click",function() {
    
    let setAInput = document.querySelector("#set-a-input").value;
    let setBInput = document.querySelector("#set-b-input").value;

    let relationInput = document.querySelector("#relation-input").value;

    let convert1 = converStringToArray(setAInput);
    let convert2 = converStringToArray(setBInput);
    let convert3 = convertStringTo2DArray(relationInput);

    let isTrue = true;

    if(convert1.length > 15 || convert2.length > 15) {
        alert("Length Error")
        return;
    }

    
    for(let i = 0; i < convert1.length; i++) {
        if(convert1[i] == 0) continue;
        if(!convert1[i] || convert1[i] > 999) {
            isTrue = false;
            break;
        }
    }

    for(let i = 0; i < convert2.length; i++) {
        if(convert2[i] == 0) continue;
        if(!convert2[i] || convert2[i] > 999) {
            isTrue = false;
            break;
        }
    }

    for(let i = 0; i < convert3.length; i++) {
        if(!convert3[i] || convert3[i].length > 2) {
            isTrue = false;
            break;
        }
    }

    if(isTrue) {
        let setA = convert1;
        let setB = convert2;
        let relation = relationInput;

        tableMap(setA, setB, relation);
    } else alert("Provide Valid Input")
})

tableMap([-2,-1,0,1,2],[-5,-4,0,4,5],"{(-1,-4),(-1,-5),(1,0),(-5,2),(1,5),(2,0),(2,5)}")
// tableMap([12,2,33,4,5],[1,2,3,55,4],"{(12,1),(12,3),(12,5),(2,55),(1,55),(2,3),(4,3),(5,3),(2,4),(33,1),(33,4)}")

