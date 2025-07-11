import { readFileSync } from "fs";

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function createdLinkedList(nums) {
  let dummy = new ListNode();
  let current = dummy;

  for (let num of nums) {
    current.next = new ListNode(parseInt(num));
    current = current.next;
  }
  return dummy.next;
}

function addTwoNumbers(l1, l2) {
  //code here
  let dummy = new ListNode();
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;

    let sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);

    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

//driver code
function Main(org) {
  let input = arg.trim().split("\n");
  let [nums1, nums2] = input[0].split("~");

  let list1 = createdLinkedList(nums1.split(" "));
  let list2 = createdLinkedList(nums2.split(" "));

  let result = addTwoNumbers(list1, list2);

  let output = "";
  let current = result;
  while (current !== null) {
    output += current.val + " ";
    current = current.next;
  }

  return output.trim();
}

let stdnBuffer = readFileSync(0);
console.log(Main(stdnBuffer.toString()));
