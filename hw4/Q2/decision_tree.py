from util import entropy, information_gain, partition_classes
import numpy as np
import ast

DEPTH = 30
class Node:
    def __init__(self,split_attribute,split_value):
        self.split_attribute = split_attribute
        self.split_value = split_value
        self.left = None
        self.right = None
        self.leaf = False

class Leaf:
    def __init__(self,value):
        self.value = value
        self.leaf = True



def predict_values(root, record):
    if (root.leaf == True):
        return root.value
    if record[root.split_attribute]>root.split_value:
        return predict_values(root.right,record)
    else:
        return predict_values(root.left,record)


def find_target_attribute(y):
    # finding target attribute here
    # we will choose that attribute which has appeared maximum number of times
    result  = {}
    for val in y:
        try:
            result[val] += 1
        except:
            result[val] = 1

    #find key with maximum occurance
    #key  = max(result, key=result.get)
    # from stack overflow to calculate the maximum from the dictionary
    key_max = max(result.keys(), key=(lambda k: result[k]))
    return key_max


def get_split_value(X, split_attribute):
    numerical_cols = set([0, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20])
    if split_attribute not in numerical_cols:
        result = {}
        for item in range(len(X)):
            try:
                result[item] += 1
            except:
                result[item] = 1
        key_max = max(result.keys(), key=(lambda k: result[k]))
        return key_max
    else:
        # numerical values
        sum = float(0)
        #print(X)
        for item in range(len(X)):
            sum += X[item][split_attribute]
        value = sum/float(len(X))
        return value



def get_best_split_points(X, y):
    best_info_gain = 0
    best_split_attrib =0
    for split_attribute in range(len(X[0])):
        split_val =  get_split_value(X,split_attribute)
        X_left,X_right,y_left,y_right = partition_classes(X,y,split_attribute,split_val)
        y_current = [y_left,y_right]
        info_gain = information_gain(y,y_current)
        if info_gain > best_info_gain:
            best_info_gain = info_gain
            best_split_attrib = split_attribute

    best_split_value  =  get_split_value(X,best_split_attrib)
    return best_split_attrib,best_split_value,best_info_gain



class DecisionTree(object):
    def __init__(self):
        # Initializing the tree as an empty dictionary or list, as preferred
        #self.tree = []
        self.root = None


    def learn(self, X, y):
        # TODO: Train the decision tree (self.tree) using the the sample X and labels y
        # You will have to make use of the functions in utils.py to train the tree

        # One possible way of implementing the tree:
        #    Each node in self.tree could be in the form of a dictionary:
        #       https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
        #    For example, a non-leaf node with two children can have a 'left' key and  a
        #    'right' key. You can add more keys which might help in classification
        #    (eg. split attribute and split value)

        self.root = self.recursive_tree(X,y,0,DEPTH)
        #print(self.tree)
        # print('se')
        # print(self.tree[0,0],self.tree[0,1],self.tree[0,2],self.tree[0,3])




    def recursive_tree(self, X, y, current_depth,max_depth):
        #y = y.astype(np.int)

        """
        
        lets determine how to split the tree with attribute,i.e cal split_value
        we can chose the split attribute to be every column that we get.
        If i found columns as numerical i can calculate the mean of all the elements in there
        if the column is catogorical we can simply calculate the mode value
        once we have found the split value, we can partition the data and can than calculate the information gain
        Once i get the info gain, i can choose the max info gain use that split as the accepted split
        
        """
        # import collections
        # info_gain = collections.defaultdict(list)
        # when we have reached the leaf level
        if current_depth == max_depth:
            value = find_target_attribute(y)
            node = Leaf(value)
            return node

        # splitting the value here:
        split_attribute, split_val, best_info_gain = get_best_split_points(X,y)
        X_left, X_right, y_left,y_right =  partition_classes(X,y,split_attribute,split_val)

        # recursion break point
        if len(y_left) == 0 or len(y_right)== 0:
            value = find_target_attribute(y)
            node = Leaf(value)
            return node

        else:
            node = Node(split_attribute,split_val)
            node.left = self.recursive_tree(X_left,y_left,current_depth+1,max_depth)
            node.right = self.recursive_tree(X_right,y_right,current_depth+1,max_depth)

        return node

    def classify(self, record):
        # TODO: classify the record using self.tree and return the predicted label
        return predict_values(self.root,record)