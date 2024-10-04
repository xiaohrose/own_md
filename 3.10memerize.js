
function mergeSortNums(num1, num2, m, n) {

    let len = m + n - 1;
    let left = m - 1, right = n - 1;

    while (left >= 0 && right >= 0) {
        if (num1[left] > num2[right]) {
            num1[len--] = num1[left--];
        } else {
            num1[len--] = num2[right--]
        }
    }

    while (right >= 0) {
        num1[len--] = num2[right--]
    }

    return num1;
}

console.log(test([1, 2, 3, 0, 0, 0], [2, 5, 6], 3, 3))

/**
 *  不重复三数组合
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */

function threeSum(nums, target) {

    let res = [];
    if (!nums.length) return res;
    // 先排序

    nums = nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;

        if (i > 0 && nums[i] == [nums[i - 1]]) continue;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum > target) {
                right--
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
            } else if (sum < target) {
                left++
                while (left < right && nums[left] === nums[left + 1]) left++
            } else {
                res.push([nums[i], nums[left++], nums[right--]]);

                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
            }
        }
    }

    return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4], 0));


// 两数求和
function twoSum(nums, target) {
    let map = {};

    for (let i = 0; i < nums.length; i++) {
        if (!map[target - nums[i]]) {
            map[nums[i]] = i;
        } else {
            return [map[target - nums[i]], i]
        }
    }
}

console.log(twoSum([2, 3, 4, 7], 10))


/**
 * 最多删除一个字符是否是 panlindorme（回文）
 * @param {*} s 
 * @returns 
 */
function delOneIsPalindrom(s) {

    let left = 0, right = s.length - 1;

    while (left <= right) {
        if (s[left] === s[right]) {
            left++;
            right--;
        } else {
            if (isPalindrom(left + 1, right, s) || isPalindrom(left, right - 1, s)) {
                return true
            } else {
                return false
            }
        }

    }

    function isPalindrom(left, right, s) {

        while (left <= right) {
            if (s[left] !== s[right]) {
                return false
            } else {
                left++;
                right--;
            }
        }

        return true
    }

    return true
}

console.log(delOneIsPalindrom('aba'));
console.log(delOneIsPalindrom('abcca'));

/**
 * 合并两个有序链表
 */
function mergeL(l1, l2) {

    if (!l1 || !l2) return l1 || l2;

    let head = cur = {
        val: 'head',
        next: null
    }

    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }

        cur = cur.next;
    }

    cur.next = l1 || l2;
    return head.next
}

// 链表删除操作


/**
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。这题这次复习做错了，attention！(当前重复的节点保留一个)
 */
function delNode(l) {

    let cur = l;

    while (cur && cur.next) {

        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }

    return l;

}


// 重复的元素所有的都删除
function delAllMulti(l) {
    let head = {
        next: l
    }

    cur = head;

    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const value = cur.next.val;
            while (value === cur.next.value) {// 这里缺少了个 cur.next !== null判断
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next
        }
    }

    return head.next;
}

/**
 * 删除第 n 个节点
 */

function delNNode(l, n) {

    let head = { next: l };
    let p = head;
    for (let i = 0; i <= n; i++) { // 这里需要确认下是否是正确的点
        p = p.next;
    }

    let slow = head;

    while (p) {
        p = p.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return head.next

}

/**
 * 检查是否是环形链表 // 这里发现一个更好的方式来进行判断
 * @param {*} l 
 * @returns 
 */

function checkCircleLink(l) {

    let p1 = p2 = l;

    while (p1 && p2 && p2.next) {
        p1 = p1.next;
        p2 = p2.next.next;

        if (p1 === p2) {
            return true
        }
    }

    return false
}


function otherCircleCheck(head) { // 通过一个容器存储下，如果已经存了，就代已经经过了，有环！！！

    let visited = new Set();

    while (head) {
        if (visited.has(head)) {
            return true
        } else {
            visited.add(head);
            head = head.next;
        }
    }

    return false
}


/**
 * 反转链表
 */
function reverseL(l) {
    let pre = null, cur = l;

    while (cur) {
        l.next = cur.next;
        cur.next = pre;
        pre = cur
        cur = l.next
    }

    l.next = pre;
}

/**
 * 括号问题
 */
// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
    if (!s) return true;
    let stack = []

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        if (ch === '(' || ch === '[' || ch === '{') stack.push(leftToRight[ch])

        else {
            if (!stack.length || stack.pop() !== ch) {
                return false
            }
        }
    }

    return !stack.length


};

console.log(isValid("({[]})"));