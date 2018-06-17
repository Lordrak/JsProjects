// var nb1 = process.argv[2];
// var operator = process.argv[3];
// var nb2 = process.argv[4];

// var listOp = {"+":"+","-":"-","/":"/","X":"X", "^" : "^"}

// if((operator in listOp) && !isNaN(nb1) && !isNaN(nb2)) {
// 	if(operator == "X"){
// 		operator = "*";
// 	}
// 	else if(operator == "^"){
// 		operator = "**";
// 	}
//	var result = parseInt(nb1) + operator + parseInt(nb2)

// 	console.log(eval(result));
// }


var operator = "";

for (var i = 2; i < process.argv.length; i++) {
	if(process.argv[i] == "X"){
 		operator += "*";
 	}
 	else if(process.argv[i] == "^"){
 		operator += "**";
 	}
 	else{
 		operator += process.argv[i];
 	}
	
}

console.log(eval(operator));