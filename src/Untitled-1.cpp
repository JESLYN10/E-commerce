// User function template for C++

class Solution {
  public:
    vector<int> factorial(int n) {
        // code here
        int res=1;
        vector<int> ans;
        while(n>0){
            res*=n;
            n--;
        }
        while(res>0){
            int rem=res%10;
            ans.push_back(rem);
            res=res/10;
        }
        return ans;
    }
};