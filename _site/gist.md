# Arrays

### Search in a rotated sorted arrya
We do a binary search. For each iteration, there are two different sorted arrays, one on the left, and one on the right. Its just a matter of checking in which sorted array our element lies in. We iterate on that side.

```c
int low = 0;
int high = nums.length-1;
int mid;

if(nums.length == 0) {
    return -1;
} else if(nums.length == 1) {
    return (nums[0] == target ? 0 : -1);
}

while(low <= high) {
    mid = low + (high - low)/2;    
    if(nums[mid] == target) {
        return mid;
    }

    if(nums[low] <= nums[mid]) {
        if(nums[low] <= target && target < nums[mid]) {
            high = mid;
        } else {
            low = mid+1;
        }
    } else {
        if(nums[mid] <= target && target < nums[high]) {
            low = mid+1;
        } else {
            high = mid;
        }
    }
}
return -1;
```
### Floor and ceiling in an array with Binary Search
What we do is simply regular binary search, but with an extra condition that we have to compare the target with a range of 2 values, that it is less than the previous and greater than the next. if target > mid AND target < mid + 1, then mid+1 is the ceiling. Similarly, mid will be the floor. We check this for both mid/mid+1 combo and mid-1/mid combo.

```java
 public static int ceiling(int[] nums, int target) {
        int low = 0;
        int high = nums.length-1;
        int mid;
        if(nums.length == 0) {
            return -1;
        }

		if(nums.length == 1) {
            return (target < nums[0] ? nums[0] : -1);
        }
        
        while(low <= high) {
        	System.out.println(bigo++);
            if(target < nums[low]) {
                return nums[low];
        } else if(target > nums[high]) {
                return -1;
            }
        
	  	mid = low + (high - low)/2;
            if(target > nums[mid]) {
                if(target < nums[mid + 1]) {
                    return nums[mid+1];
                } else {
                    low = mid+1;
                }
            } else {
                if(target > nums[mid - 1]) {
                    return nums[mid];
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
```

### Contigous Subarray of a given sum
To do this, we use a Dynamic window that increases in size until it maxes out the window, then decreases until the same happens, and contiously does this for the length of the array.

```java
public class Solution {
    public int minimum(int[] nums, int target) {
        int lo = 0;
        int hi = 0;
        int sum = nums[lo];
        int minLength  = nums.length;
        boolean found = false;
        while(hi < nums.length) {
            
            while(sum < target && hi < nums.length) {
                hi++;
                sum+=nums[hi];
            }

        while(sum >= target && lo < nums.length) {
            
            if(sum == target && hi - lo < minLength) minLength = hi - lo;
                sum-=nums[lo];
                lo++;
                found = true;
            }            
        }
        return (found ? minLength : 0);
    }
}
```

### Subarray with Maximum sum - Kadane's Algorithm

```java
public class Solution {
    public int maxSubArray(int[] nums) {
        int sum = 0;
        int maxSum = 0 - Integer.MAX_VALUE;
        
        if(nums.length == 0) return 0;
        if(nums.length == 1) return nums[0];
        
        for(int i = 0; i < nums.length; i++) {
            
            sum+=nums[i];
            if(sum > maxSum) maxSum = sum;
            if(sum < 0) sum = 0;
        }
        
        return maxSum;
    }
}
```

# Dynamic Programming

### Longest Common substring
For the longest common substring, we simply check if a character matches, if so, add 1 to the previous match of the two substrings, else take the sum of including one and excluding other, and including other and excluding one. (1 + corner or left + top). However, we need to match every possible substring between the two strings, so we maintain a 2D array mapping the lengths of the two strings, and for calculate the value based on the above equation.
```java
public int longest(String str1, String str2) {
    int[][] L = new int[str1.length()][str2.length()];

    for(int i = 0; i <= L.length; i++) {
        for(int j = 0; j <= L[i].length; j++) {
            if(i == 0 || j == 0) L[i][j] = 0;
            if(str1.charAt(i-1) == str2.charAt(j-1))
                L[i][j] = 1 + L[i-1][j-1];
            else
                L[i][j] = L[i-1][j] + L[i][j-1];
        }
    }
    return L[i][j];
}
```



### Longest increasing array
This is harder to do in linear time, and simpler in dynamic programming which takes o(n^2). The fastest solution is that we keep track of each possible list that could be the potential longest array, however we only need to keep track of the last element in that array. For each element, we check for 3 cases - its' the smallest so far, so replace the first list, - its the largest so far, so add a new list with the largest - its between two lists, so we take the largest one that is still smaller than it, and append to it the new pointer.

```java
public int longest(int[] nums) {
    //we keep largest end pointers to keep track of possible active lists.
    int[] largestPointers = new int[nums.length];
    largestPointers[0] = 0;
    int count = 0;
    
    //three possible cases, either the next value is the smallest, largest, or in between
    for(int i = 0; i < nums.length; i++) {
        //the new value is smallest, so we replace the first active list with it
        if(nums[i] < largestPointes[0]) {
            largestPointers[0] = nums[i];
                count++;
            }
        
        //the new value is the largest, so we add a new active list with this value
        else if(nums[i] > largestPointers[count]) {
                largestPointers[count++] = nums[i];
        } 
    
        //the new value is in between, so we find the largest pointer which can be extended, extend it, and replace the list after it, because its not needed anymore.
        else {
            int previousIndex = binarySearch(nums, 0, nums.length -1, nums[i]);
            largestPointers[previousIndex] = nums[i];
        }
    }
    return largestPointers[count];    
}
//does a binary search for the ceiling value by stopping when there are 2 elems left
public int binarySearch(int[] nums, int lo, int hi, int key) {
    int m ;
    while(hi - lo > 1) {
        m = (lo + (hi - lo)/2);
        if(nums[m] > key) hi = m;
        else lo = m+1;
    }
    return r;
}
```

### Subset sum
Used to find if there is a non-contigous subset in an array that matches a particular sum. It can be applied to many other questions, like Knapsack and coin change. Calculate subset sum by considering each case to have to possibilities, either you include the value, or you don't. To exclude it, it is L[i][j-1] and to include it, it is L[i - arr[j-1]][j-1]

```java
int[][] L = new int[n][m];

//assuming n = m, but initilization should be done separately for first row and column
for(int i = 0; i < L.length; i++) {
	L[i][0] = 1;
	L[0][i] = 0;
}

for(int i = 1; i < L.length; i++) {
	for(j = 1; j < L[i].length; j++) {
		if(arr[i] > m) {
			L[i][j] = L[i][j-1];
		} else {
			L[i][j] = L[i][j-1] + L[i - arr[j-1]][j-1];
		}
	}
}

return L[L.length-1][L.length-1];		
```

# Linked Lists

### Reverse a Linked List
It is very easy, recursively keep track of the element afterwards, and call the function for head.next until it reaches null. When it does, return reference to tail while setting the next pointers correctly in backtracking.

```java
public Node reverse(Node head) {
    
    if(head.next == null) {
        return head;
    }

    Node after = head.next;
    head.next = null;
    Node rev = reverse(head.next);
    after.next = head;
    return rev;
}
```

# Binary Trees

### Inorder traversal
We use a stack to keep track of elements which have to be traversed. Since its a BST, we go all the way to the very left, add elements, and then go to the right, all the way to its left, and so on.
```java
import java.util.*;
public List<Integer> inorderTraversal(TreeNode root) {
    Stack<TreeNode> stack = new Stack<TreeNode>();
    List<Integer> list = new LinkedList<Integer>();
    stack.push(root);
    while(!stack.isEmpty()) {    
        while(root != null && root.left != null) {
            stack.push(root.left);
            root = root.left;
        }
        root = stack.pop();
        list.add(root.val);
        root = root.right;
        if(root != null) {
            stack.push(root);
        }
    }
}
```

### Preorder Traversal
Very intuitive. We keep on moving left of the root, while pushing its right child on to the stack. We set the root by removing the element from the stack.

```java
    public List<Integer> preorderTraversal(TreeNode root) {
        
        Stack<TreeNode> stack = new Stack<TreeNode>();
        List<Integer> list = new LinkedList<Integer>();
        if(root == null) return list;
        stack.push(root);
        while(!stack.isEmpty()) {
            
            while(root != null) {
                if(root.right != null)
                    stack.push(root.right);
                list.add(root.val);
                root = root.left;
            }
            
            root = stack.pop();
        }
        
        return list;
    }
```

### Postorder Traversal
Postorder traversal is very similar to preorder traversal in the sense that it is its inverse and reverse. The right and left elements are swapped and the root comes afterwards. Use this property to build a Preorder list, and add elements to the head of a Linked List.

```java
public List<Integer> postorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        LinkedList<Integer> list = new LinkedList<Integer>();
        
        if(root == null) return list;
        
        stack.push(root);
        
        while(!stack.isEmpty()) {
            while(root != null) {
                if(root.left != null)
                    stack.push(root.left);
                list.addFirst(root.val);
                root = root.right;
            }   
            root = stack.pop();
        }
        return list;
    }
```

### Level Order Traversal
```java
public void print(TreeLinkNode root) {
        Queue<TreeLinkNode> queue = new LinkedList<TreeLinkNode>();
        queue.add(root);
        int currentRow = 1;
        int totalNextRow = 0;
        TreeLinkNode ptr;
        TreeLinkNode tmp;
        if(root == null) return;
        
        while(!queue.isEmpty()) {
            while(currentRow > 0) {
                ptr = queue.remove();
                System.out.print(ptr.val + " ");
                
                if(ptr.left != null) {
                    queue.add(ptr.left);
                    totalNextRow++;
                }
                    
                if(ptr.right != null) {
                    queue.add(ptr.right);
                    totalNextRow++;
                }
                    
                currentRow--;
            }
            currentRow = totalNextRow;
            totalNextRow = 0;
            System.out.println();
        }
    }
```

### Lowest Common Ancestor
Really easy when you think about it. The lowest common ancestor is the node which has one value on its left, and the other on its right. if both are on the left or both on the right, than its not the LCA. Backtrack until the above condition is met.

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        
        if(root == null) {
            return null;
        }
        
        if(root == p || root == q) {
            return root;
        }
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if(left != null && right != null) {
            return root;
        } else {
            if(left != null && right == null) {
                return left;
            }
            
            if(right != null && left == null) {
                return right;
            } else {
                return null;
            }
        }
        
    }
```

# Brute Force algorithms

### All permutations of a string
You find permutations for each number, by caling the recursive call for each part of the array. Use a partial list to keep track of the current permutation, adding elements to it recursively until base case is reached, then remove the last element and start permuting on the index afterwards.

It is easier to do this iteratively instead, by using array rotations to find permutations instead.
```java
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> lists = new ArrayLists<List<Integer>>();
    for(int i = 0; i < nums.length; i++) {
        lists = permute(nums, lists, new ArrayList<Integer>(), i);
    }
}

public List<List<Integer>> permute(int[] nums, List<List<Integer>> lists, List<Integer> partial, int pos) {
if(partial.length() == nums.length) {
    partial.add(nums[pos]);
    lists.add(new ArrayList<Integer>(partial));
    return lists;
}
    
    partial.add(nums[pos]);
    for(int i = 0; i < nums.length; i++) {
        if(!partial.contains(nums[i]) {
        lists = permute(nums, lists, partial, i);
        partial.remove(partial.length()-1);
        }
    }
}
```

### Regular Expression matching
A little harder to comprehend, but the essential idea is that we are ehcking for every possible forward substring. If the string contains a . or are the same, then we move ahead to next character in both strings. Else, if it is not, then we skip the *, and check if rest of the string matches without the star there, if it does, return that, else, we backtrak and recurse from the original string instead.
```C
bool isMatch(const char *s, const char *p) {
  assert(s && p);
  if (*p == '\0') return *s == '\0';
 
  // next char is not '*': must match current character
  if (*(p+1) != '*') {
    assert(*p != '*');
    return ((*p == *s) || (*p == '.' && *s != '\0')) && isMatch(s+1, p+1);
  }
  // next char is '*'
  while ((*p == *s) || (*p == '.' && *s != '\0')) {
    if (isMatch(s, p+2)) return true;
    s++;
  }
  return isMatch(s, p+2);
}
```
