
export default function InitNameLogic(obj) {

let arr1 = Array.from(obj.fname);
let arr2 = Array.from(obj.lname);

let Fname = arr1[0];
let Lname = arr2[0];

let FinalName = Fname+Lname
// console.log(FinalName);

return FinalName;
}



