## Data and Visual Analytics - Homework 4
## Georgia Institute of Technology
## Applying ML algorithms to detect seizure

import numpy as np
import pandas as pd
import time

from sklearn.model_selection import cross_val_score, GridSearchCV,cross_validate, train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.svm import SVC
from sklearn.linear_model import LinearRegression
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, normalize
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)


######################################### Reading and Splitting the Data ###############################################
# XXX
# TODO: Read in all the data. Replace the 'xxx' with the path to the data set.
# XXX
data = pd.read_csv('seizure_dataset.csv')

# Separate out the x_data and y_data.
x_data = data.loc[:, data.columns != "y"]
y_data = data.loc[:, "y"]

# The random state to use while splitting the data.
random_state = 100

# XXX
# TODO: Split 70% of the data into training and 30% into test sets. Call them x_train, x_test, y_train and y_test.
# Use the train_test_split method in sklearn with the paramater 'shuffle' set to true and the 'random_state' set to 100.
# XXX
x_train,x_test,y_train,y_test = train_test_split(x_data,y_data,test_size=0.3,random_state=random_state,shuffle=True)
#print(x_train.shape,y_train.shape)
#print(x_test.shape,y_test.shape)


# ############################################### Linear Regression ###################################################
# XXX
# TODO: Create a LinearRegression classifier and train it.
# XXX

lm = LinearRegression()
model = lm.fit(x_train,y_train)
lr_predictions_test = lm.predict(x_test)
lr_predictions_train = lm.predict(x_train)

# XXX
# TODO: Test its accuracy (on the training set) using the accuracy_score method.
# TODO: Test its accuracy (on the testing set) using the accuracy_score method.
# Note: Use y_predict.round() to get 1 or 0 as the output.
# XXX
accuracy_train = accuracy_score(y_train,lr_predictions_train.round(),normalize=True)
accuracy_test = accuracy_score(y_test,lr_predictions_test.round(),normalize=True)
print("lr accuracies:")
print("accuracy for train",accuracy_train)
print("accuracy for test",accuracy_test)

# ############################################### Multi Layer Perceptron #################################################
# XXX
# TODO: Create an MLPClassifier and train it.
# https://skymind.ai/wiki/multilayer-perceptron
# XXX

#clf = MLPClassifier(hidden_layer_sizes=(100,100,100),max_iter=500,alpha=0.0001,solver='sgd',verbose=10,random_state=100,tol=0.000000001)
clf = MLPClassifier()
clf.fit(x_train,y_train)
mlp_predictions_test = clf.predict(x_test)
mlp_predcitions_train = clf.predict(x_train)
# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX
mlp_accuracy_train = accuracy_score(y_train,mlp_predcitions_train,normalize=True)
mlp_accuracy_test = accuracy_score(y_test,mlp_predictions_test,normalize=True)
print("mlp accuracies:")
print("accuracy for train",mlp_accuracy_train)
print("accuracy for test",mlp_accuracy_test)


# ############################################### Random Forest Classifier ##############################################
# XXX
# TODO: Create a RandomForestClassifier and train it.
# XXX
rf_clf = RandomForestClassifier()
rf_clf.fit(x_train,y_train)
rf_predictions_test =  rf_clf.predict(x_test)
rf_predictions_train = rf_clf.predict(x_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX
rf_accuracy_test = accuracy_score(y_test,rf_predictions_test,normalize=True)
rf_accuracy_train = accuracy_score(y_train,rf_predictions_train,normalize=True)
print("Random forest:")
print("accuracy for train",rf_accuracy_train)
print("accuracy for test",rf_accuracy_test)

# XXX
# TODO: Tune the hyper-parameters 'n_estimators' and 'max_depth'.
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX

x_train_n,x_test_n,y_train_n,y_test_n = train_test_split(x_data,y_data,test_size=0.3,random_state=100,shuffle=True)
param_grid = {
    'max_depth':[5,15,25],
    'n_estimators': [5,15,25]
}

rf_clf = RandomForestClassifier()
grid_search_cv = GridSearchCV(estimator=rf_clf,param_grid=param_grid,cv=10)
grid_search_cv.fit(x_train_n,y_train_n)
print("best_params:",grid_search_cv.best_params_)
print("best_score:",grid_search_cv.best_score_)
#print("best estimators:",grid_search_cv.best_estimator_)



# ############################################ Support Vector Machine ###################################################
# XXX
# TODO: Pre-process the data to standardize or normalize it, otherwise the grid search will take much longer
# TODO: Create a SVC classifier and train it.
# https://medium.com/@lahorekid/a-dummies-guide-to-data-normalization-for-neural-nets-ff1998116e75
# XXX

scalar = StandardScaler()
scalar.fit(x_train)
n_x_train = scalar.transform(x_train)
n_x_test = scalar.transform(x_test)
n_y_train = y_train
n_y_test = y_test
svc_clf = SVC()
svc_clf.fit(n_x_train,n_y_train)
svc_y_predict_test = svc_clf.predict(n_x_test)
svc_y_predict_train = svc_clf.predict(n_x_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX

svc_accuracy_train = accuracy_score(y_train,svc_y_predict_train,normalize=True)
svc_accuracy_test = accuracy_score(y_test,svc_y_predict_test,normalize=True)

print("svc accuracies test:",svc_accuracy_test)
print("svc accuracies train:",svc_accuracy_train)

# XXX
# TODO: Tune the hyper-parameters 'C' and 'kernel' (use rbf and linear).
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX
param_grid = {'kernel':['linear','rbf'],'C': [0.1,0.01,0.001]}
grid_svc_clf = SVC()
grid_search_clf = GridSearchCV(estimator=grid_svc_clf,param_grid=param_grid,cv=10)
grid_search_clf.fit(n_x_train,n_y_train)
#print("best params:",grid_search_clf.best_params_)
#print("best score:",grid_search_clf.best_score_)
#print("mean test scores",grid_search_clf.cv_results_['mean_test_score'])
#print("mean train scores",grid_search_clf.cv_results_['mean_train_score'])
print("mean fit time",grid_search_clf.cv_results_['mean_fit_time'])
print("highest mean test score",max(grid_search_clf.cv_results_['mean_test_score']))
print("mean train score",np.mean(grid_search_clf.cv_results_['mean_train_score']))
print("mean fit time",np.mean(grid_search_clf.cv_results_['mean_fit_time']))
