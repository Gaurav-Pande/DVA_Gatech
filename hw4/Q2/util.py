from scipy import stats
import numpy as np
import math


# This method computes entropy for information gain
def entropy(class_y):
    # Input:
    #   class_y         : list of class labels (0's and 1's)

    # TODO: Compute the entropy for a list of classes
    #
    # Example:
    #    entropy([0,0,0,1,1,1,1,1,1]) = 0.92
    # 3/9*log(3/9) + 6/9*log(6/9)
    # 1/3(log3 -log9 + 2log6 - 2log9) = 1/3(2log2 -3log3) = 1/3(2-log9)
    entropy = 0
    if len(class_y)  == 0:
        return 0
    else:
        class_y = list(class_y)
    count_0 =  class_y.count(0)
    count_1 = class_y.count(1)
    if count_0 == 0  or count_1 == 0:
        return 0
    p_0 =  float(count_0)/(count_0+count_1)
    p_1 =  float(count_1)/(count_0+count_1)
    entropy =  -(p_0*math.log(p_0,2) + p_1*math.log(p_1,2))
    return entropy


def partition_classes(X, y, split_attribute, split_val):
    # Inputs:
    #   X               : data containing all attributes
    #   y               : labels
    #   split_attribute : column index of the attribute to split on
    #   split_val       : either a numerical or categorical value to divide the split_attribute

    # TODO: Partition the data(X) and labels(y) based on the split value - BINARY SPLIT.
    #
    # You will have to first check if the split attribute is numerical or categorical
    # If the split attribute is numeric, split_val should be a numerical value
    # For example, your split_val could be the mean of the values of split_attribute
    # If the split attribute is categorical, split_val should be one of the categories.
    #
    # You can perform the partition in the following way
    # Numeric Split Attribute:
    #   Split the data X into two lists(X_left and X_right) where the first list has all
    #   the rows where the split attribute is less than or equal to the split value, and the
    #   second list has all the rows where the split attribute is greater than the split
    #   value. Also create two lists(y_left and y_right) with the corresponding y labels.
    #
    # Categorical Split Attribute:
    #   Split the data X into two lists(X_left and X_right) where the first list has all
    #   the rows where the split attribute is equal to the split value, and the second list
    #   has all the rows where the split attribute is not equal to the split value.
    #   Also create two lists(y_left and y_right) with the corresponding y labels.

    '''
    Example:

    X = [[3, 'aa', 10],                 y = [1,
         [1, 'bb', 22],                      1,
         [2, 'cc', 28],                      0,
         [5, 'bb', 32],                      0,
         [4, 'cc', 32]]                      1]

    Here, columns 0 and 2 represent numeric attributes, while column 1 is a categorical attribute.

    Consider the case where we call the function with split_attribute = 0 and split_val = 3 (mean of column 0)
    Then we divide X into two lists - X_left, where column 0 is <= 3  and X_right, where column 0 is > 3.

    X_left = [[3, 'aa', 10],                 y_left = [1,
              [1, 'bb', 22],                           1,
              [2, 'cc', 28]]                           0]

    X_right = [[5, 'bb', 32],                y_right = [0,
               [4, 'cc', 32]]                           1]

    Consider another case where we call the function with split_attribute = 1 and split_val = 'bb'
    Then we divide X into two lists, one where column 1 is 'bb', and the other where it is not 'bb'.

    X_left = [[1, 'bb', 22],                 y_left = [1,
              [5, 'bb', 32]]                           0]

    X_right = [[3, 'aa', 10],                y_right = [1,
               [2, 'cc', 28],                           0,
               [4, 'cc', 32]]                           1]

    '''

    X_left = []
    X_right = []

    y_left = []
    y_right = []

    numerical_cols = set([0, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20])
    if split_attribute not in numerical_cols:
        for i in range(len(X)):
            if X[i][split_attribute] == split_val:
                X_left.append(X[i])
                y_left.append(y[i])
            else:
                X_right.append(X[i])
                y_right.append(y[i])
    else:
        for i in range(len(X)):
            if float(X[i][split_attribute]) <= split_val:
                X_left.append(X[i])
                y_left.append(y[i])
            else:
                X_right.append(X[i])
                y_right.append(y[i])

    return (X_left, X_right, y_left, y_right)


def information_gain(previous_y, current_y):
    # Inputs:
    #   previous_y: the distribution of original labels (0's and 1's)
    #   current_y:  the distribution of labels after splitting based on a particular
    #               split attribute and split value

    # TODO: Compute and return the information gain from partitioning the previous_y labels
    # into the current_y labels.
    # You will need to use the entropy function above to compute information gain
    # Reference: http://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15381-s06/www/DTs.pdf

    """
    Example:

    previous_y = [0,0,0,1,1,1]
    current_y = [[0,0], [1,1,1,0]]

    info_gain = 0.45915
    """

    info_gain = 0
    H =  entropy(previous_y)
    if current_y is None:
        return 0
    else:
        current_y = list(current_y)
    V_l = current_y[0]
    count_0 =  len(V_l)
    V_r = current_y[1]
    count_1 = len(V_r)
    P_l = float(count_0)/(count_0 + count_1)
    P_r = float(count_1)/(count_0 +  count_1)
    H_l = entropy(V_l)
    H_r = entropy(V_r)
    info_gain = H - (P_l*H_l + P_r*H_r)

    return info_gain


# if __name__ == '__main__':
#     X = [[3, 'aa', 10],
#          [1, 'bb', 22],
#          [2, 'cc', 28],
#          [5, 'bb', 32],
#          [4, 'cc', 32]]
#     y = [1,1,0,0,1]
#     print(partition_classes(X,y,0,3))
