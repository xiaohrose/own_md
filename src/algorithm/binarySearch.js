const binarySearch = (nums, val) => {
    if (!nums.length) return -1;

    let left = 0, right = nums.length;

    while (left <= right) {
        const middle = Math.floor((right + left) / 2);

        if (nums[middle] > val) {
            right = middle - 1
        } else if (nums[middle] < val) {
            left = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;
}