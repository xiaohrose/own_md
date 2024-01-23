function quickSort(nums) { }


/**
 * 快排的精髓就是这个，选取一个值，然后根据这个值，讲左边变成不大于这个值，右边都不小于这个值
 * @param {*} nums 
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function partition(nums, left, right) {
    const middle = nums[Math.floor((right + left) / 2)];

    while (left <= right) {

        // 下面这两个循环是没有等号的
        while (nums[left] < middle) {
            left++
        }

        while (nums[right] > middle) {
            right--
        }

        if (left <= right) {
            swap(nums, left, right);
            left++
            right--
        }
    }


    function swap(nums, left, right) {
        let temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }
    return left;
}