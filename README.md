# Predictive analytics for stock trading usingonline data and sentiment analysis

## Introduction

Various Fin-Tech platforms have started offeringintuitive  web-based  stock  analysis  applicationswhich a client can utilize for algorithmic trading.1But none of these currently offer a way to includestock’s underlying sentiment on the web (news,Twitter or even Google trends) in a client’s modelfor stock price prediction/trend analysis. We pro-pose to build an experimental tool which integrateswith online sentiments along with statistical mar-ket indicators for client’s use.

## Motivation

We will be building a user centred interface wherea user can choose and try to explore the variousmethods and features to predict stock prices , andas such continue his exploration/research. We haveincorporated online sentiments from news/twitteralso as a value addition.Our motivation is from the various results pub-lished in papers , which are one time plots and doneed a substantial setup and underlying knowl-edge to replicate by the peer reviewer/stock enthu-siast.

## Problem Definition

#### Predict Stock Prices

Given current stock data and various online datafeeds , predict the stock price using ML algorithms,market indicators and online data sentiments

#### User Interface and Scalable Code

Provide user an interface to visualize the currentand predicted stock price , and also give them the option to select features such as market indicatorsand(or) online sentiments . The code should bemodular and scalable to include more models.

## Literature Survey

Petrovsk et al. [12] confirm a substantial correla-tion between stock prices and online news . Mu-Yen Chen and Ting-Hsuan Chen [3] went a stepahead and tried to predict stock prices on TAIEX,achieving a maximum accuracy of 65.81 % . Wenget al. [14] researched on building a financial expertsystem to predict stock prices using multiple on-line data source like News trends, Wikipedia traffic,and technical indicators of stock. They developeda model using ensemble methods in [15].According to the efficient market hypothesis,stock prices should not be predictable with > 50percent accuracy [8], but there are researches try-ing to cross this [9] with the help of online sourceslike twitter feeds. Various ML techniques are usedin these [13] .Financial news also has significant effect on thestock values. Takayuki et al. [10] provide an indi-cator to measure the degree to which it attractsattention from investors. John et al.[6] confirmthis correlation .Lee and Timmons [7] categorizenews articles and predict their impact on stockprice. Tahim M Nisar, Man Yeung [11] work’s finda correlation between the local elections and stockmovements. Adam et al. [2] show that sentimentdriven behaviour have much more impact on sec-ond order financial systems.In our research for models used, Ho and Wang[5] developed an Artificial Neural Network (ANN)model to predict the stock price movements usingnews sentiment . They utilized sentiment of 24hours before stock market opening along with areduced value of previous day.Adam et al. [2] utilized fixed length news datafrom Reuters. LDA ( Latent Dirichlet Algorithm)was employed for topic modeling clustering thenews articles in 60 min intervals . Naive Bayes wasfurther used to create target vector,mapping clus-tered article vectors with binary direction labels from market data.Internal mapping was done be-tween each topic and its occurrence in the 60 mininterval. SVM was used as underlying predictionalgorithm to predict stock values.Mark et al. [4] used an LSTM neural network forcharacter level embedding for stock market fore-casting using only financial news as predictors.They created two models, first a natural languagemodel that used character encoding followed bysingle layer LSTM on financial domain news text.Themodel predicts a probability distribution over thenext possible byte. Second neural network addsone fully connected layer using leaky ReLU Acti-vation. This layer is used to predict the probabilityof a positive direction price change for the stockprice. In their work they concluded that charac-ter encodings are simpler than word encodings,also reducing the sparsity of data. Also their pre-vious work found that including body of articlesin word embeddings has lower performance thanjust including the Headlines in word embeddings.Zhang [16] uses SVM, naive based classifier forsentiment analysis and find the SVM as the moreaccurate model to implement. The paper uses Pear-son coefficient to calculate the tweet and stockcorrelation.Kordonis et al. [6] state that certain words orkeywords effect more than the whole tweet itself.Abirami et al. [1] try to formulate an incrementalmodel using Support Vector Regression techniquesfor predicting stock prices. The wins of this is thatthe model is not required to be retrained for newstock prices completely.


## Approach

Even with the increase in awareness about stockmarket and ML models being used extensively fortrading, most of the valid research is closed-doors.We thus propose a model where it is easy for ageneric user with not much domain knowledgeto try his hands out on predicting stock prices.Also , this code will be scalable to expand to more methods and help researchers with a boilerplatesetup for their work.


#### Data extraction, cleaning and assimilation

We pulled stock price and volume data for multipletickers using APIs offered by world trading data .The data available was day open-end for all history,1 minute resolution for 7 days, 5 min resolutionfor 30 days, and of-course current real time.For twitter , we fetched data based on keywordscontaining stock for tech companies like Amazon,Tesla etc. using twitter APIs. We preprocessed theraw data by removing the twitter handles (@user),stemming(stripping the suffixes (”ing”, ”ly”, ”s” etc)from a word), removing special characters, num-bers, punctuations, pound sign ,removing shortwords like "is", "the". Then we applied basic visual-ization techniques to find out the most commonwords (Figure 1.), visualizing the most commonhashtags to identify which hashtags positively af-fected the prices and which hashtags affected neg-atively (Figure 2,3.), clustering the tweets using Kmeans to identify or group the tweets accordingto the sentiment (Figure 4.).We then concatenate the subjectivity, objectivity,negative, positive, neutral columns of one dataframewith another dataframe which has data about thestock prices for the past 10 day intraday data. Af-ter creating the new concatenated dataframe, wechecked the shape and info of the dataframe andfound some null values. we replaced the null val-ues with the mean of the respective column thenull values were present.For news, articles are used to determine the moodof people towards companies. A positive articleabout a company would reflect in stock prices. Weassume the news of past three days to have an im-pact . Other features considered are news source, asmore famous the source higher the impact . Majorchallenges are Topic modelling for clustering newsabout same topic from different source , especiallywhen same article is published on different mediaat different times of day. We were using newsapi to obtain news and then club them together based onBOW approach on the abstract returned. Now weare using aylien news api which returns completearticle body along with the headlines.Data cleaning was needed before and during as-similation of stock prices data with twitter or newsdata. We had to remove the weekend data fromtwitter and news feeds , as well as tweets postedoutside the market hours.The data was stitchedon base of date/time. For tweets, we calculated an additional column which was Change = (Price 5min before - Price 5 min after)

#### Feature inspection and filtering

As part ofinvestigating the feature we did Correlation andfeatures Mutual information plots against the tar-get variable to know the correlation. We plottedthe Heat map to understand the Pearson coefficientcorrelation factor for different set of columns inthe Dataset. This gave us a better understanding tosee if there are any dependant variables or if any ofthe variables are highly correlated. Some variablesSubjectivity, Objectivity are negatively correlated.There are very few variables which seem to havea very high correlation.We also did the Inspectionof the Binary, categorical and other variables.


#### Feature importance ranking via learning mod-els

As part of Training the models - training dataagainst multiple machine learning algorithms andfine tuning a couple of algorithms for accuracy. Wedid the fine tuning using by normalizing the trainand test Datasets.We also plotted the graphs to understand theimportant labels contributing towards the success of the models and fine tune the model by remov-ing the columns which do not contribute to theaccuracy[Figure 8]


#### Experiments and Evaluation of models

Ini-tially, the feature set used was stock change per-centage, sentiment score, confidence score, no offollowers for tweets-stock analysis.But due to inaccurate model training and accu-racy score we tried to calculate the sentimentsusing an entire different approach.we followed aPython implementation of a dictionary-based sen-timent classification procedure which combinestwo different bootstrapping procedures, namelyfor subjectivity and polarity detection. We thanevaluate our models on this datasets.The evaluation of the models is done using ac-curacy score. But accuracy score is not the mosttrustworthy measure of success, so we also plottedthe ROC curve to measure the true positive vs falsenegative.


#### Visualization app

As seen in Figure 5. ourcurrent user interface for visualization and selec-tion is depicted there. The user can select a par-ticular stock from the drop down . Then he cancheck all the boxes to include as features into themodel, like Sentiments from Tweets, News or Mar-ket Indicators. Then the algorithm can be selected.Clicking on Predict will train/form the model forthe algorithm in background and store it on diskin persistent manner. Once the model is trained,the user can click on visualize and view the actualvs predicted price, as well as other charts (to bedecided).


## Details of experiments :Observations andanalysis

Analysis is done using Naive Bayes classifier toidentify the sentiments and sentiment-confidence.Then  using  the  k-means  clustering  accomplishgrouping of tweets. We evaluated the clusters byplotting the elbow curve with different clusters.The elbow curve didn’t quite answer the exactnumber to be used. So we end up choosing 5 clus-ters instead of 2-3 from the elbow plot.Further,  we  used  SVM  because  of  it’s  abilityto handle high dimensional data. For stock valueprediction, current approach uses only change in value as a feature . Therefore we are experiment-ing with using various stock indicators as MACD,EMA in feature set .To obtain sentiment, we are using Naive bayesas well as sentiment value provided by third party.We intent to experiment with deep learning basedsentiment analyzer going further.6.2.1 We train and test the tweeter dataset forthe Random Forest, LinearDiscriminantAnalysis,LogisticRegression, XGboost, SVM, KNN, Decis-cionTreeClassifier, GaussianNB, and we found outLDA to be the most effective with the accuracyscore of 91.5percent. We verified the result by plot-ting ROC-AUC curve[figure7]. We also plotted thegraph between prediction and expected values toconfirm our accuracy score[figure8].6.2.2 We train and test the reddit news datasetwith the same set of models as above but found theLDA with 94.5 percent accuracy score but on ROC-AUC curve[figure8(attach the curve garph here)]we found the area to be 0.5 suggesting the badtrained model, so we chose the XGboost modeland fine tune it with the feature extraction andPCA for dimensionality redcution and achieved anaccuracy score of 94 percent.6.2.3 We did the timeseries analysis using ARIMAmodel to predict the stock prices.Based on our code, we have found out that the ARIMA modelis best when the parameters are 0,1,0 for p,d,q re-spectively.The mean squared error of the modeltraining is about 234 which is considerably OK aswe are dealing with a significant set of numbers.We also plotted the prediction graph to depict thecloseness between the predicted values and ex-pected values(figure8(copy the graph))


## Conclusions

We performed sentiment correlation of tweets, newswith the stock prices using many machine learn-ing algorithms, and concluded that for the tweeterdataset LinearDiscriminantAnalysis performed bestwith the accuracy score of 91.5 percent and forthe reddit news dataset XGBoost performed bestwith the accuracy of 94.1 percent after performingthe PCA transformation.We can see the visualiza-tion of the prediction vs expected value[figure 6]trained using LDA model.The model is clean andred and blue lines are overlapping on one anotherclearly explaining that the predictions are quiteaccurate and that this model can further be usedfor performing predictions. The predictions areperformed on the testing set and the graph is thetesting set.Although it is an open ended questionhow actually these models prediction will effectthe real stock prices with the sentiments of newsand tweets as tweets and news are not completelycorrelated with the stock prices prediction as theyare very fickle and prone to change. We initiallyplanned to do Deep learning based sentiment anal-ysis using Standford sentiment tree bank usingneural network analysis. we couldn’t do it becausethe Data Sets doesn’t come under the financial do-main, and our Data sets couldn’t meet the require-ments of the sentiment tree bank.We also plannedto scrape the tweeter data from past 30 days butdue to API restrictions we could only collect forpast 10days. Based on various survey we expectedthe accuracy score to be around 60 percent butour results showed us that with enough featuretransformation and dimensionality reduction wecan enhance the accuracy of these models.


## REFERENCES

[1]RR Abirami and MS Vijaya. 2011. An incremental learn-ing approach for stock price prediction using supportvector regression.International Journal of Research andReviews in Artificial intelligence (IJRRAI)1, 4 (2011), 81–85

[2]Adam Atkins, Mahesan Niranjan, and Enrico Gerding.2018.  Financial news predicts stock market volatilitybetter than close price.The Journal of Finance and DataScience4, 2 (2018), 120–137.

[3]Mu-Yen Chen and Ting-Hsuan Chen. 2017. Modelingpublic mood and emotion: Blog and news sentimentand socio-economic phenomena.Future GenerationComputer Systems(2017).

[4]Leonardo dos Santos Pinheiro and Mark Dras. 2017.Stock  Market  Prediction  with  Deep  Learning:  ACharacter-based  Neural  Language  Model  for  Event-based Trading. InProceedings of the Australasian Lan-guage Technology Association Workshop 2017. 6–15.

[5]Kin-Yip Ho and Wanbin Walter Wang. 2016.  Predict-ing stock price movements with news sentiment: Anartificial neural network approach. InArtificial NeuralNetwork Modelling. Springer, 395–403.

[6]John Kordonis, Symeon Symeonidis, and Avi Aram-patzis. 2016. Stock price forecasting via sentiment anal-ysis on Twitter. InProceedings of the 20th Pan-HellenicConference on Informatics. ACM, 36.

[7]Kari Lee and Ryan Timmons. 2007. Predicting the StockMarket with News Articles.

[8]Burton G Malkiel. 2003. The efficient market hypothesisand its critics.Journal of economic perspectives17, 1(2003), 59–82.

[9]Anshul   Mittal   and   Arpit   Goel.   2012.Stockpredictionusingtwittersentimentanal-ysis.Standford   University,   CS229 
(2011http://cs229.stanford.edu/proj2011/GoelMittal-StockMarketPredictionUsingTwitterSentimentAnalysis.pdf)15 (2012).

[10]Takayuki  Mizuno,  Takaaki  Ohnishi,  and  TsutomuWatanabe. 2017. Novel and topical business news andtheir impact on stock market activity.EPJ Data Science6, 1 (2017), 26.

[11]Tahir M Nisar and Man Yeung. 2018. Twitter as a tool forforecasting stock market movements: A short-windowevent study.The Journal of Finance and Data Science4,2 (2018), 101–119.

[12]Jonáš Petrovsk`y, Pavel Netolick`y, and František Dařena.2017.  Examining Stock Price Movements on PragueStock Exchange Using Text Classification.InternationalJournal of New Computer Architectures and their Appli-cations (IJNCAA)7, 1 (2017), 8–13.

[13]Bo Qian and Khaled Rasheed. 2007. Stock market pre-diction with multiple classifiers.Applied Intelligence26,1 (2007), 25–33.

[14]Bin Weng, Mohamed A Ahmed, and Fadel M Megahed.2017.  Stock market one-day ahead movement predic-tion using disparate data sources.Expert Systems withApplications79 (2017), 153–163.

[15]Bin  Weng,  Lin  Lu,  Xing  Wang,  Fadel  M  Megahed,and Waldyn Martinez. 2018.   Predicting Short-TermStock Prices using Ensemble Methods and Online DataSources.Expert Systems with Applications(2018).[16]Linhao Zhang. 2013.Sentiment analysis on Twitter withstock price and significant keyword correlation.  Ph.D.Dissertation


#### Contributions:
* Gaurav Pande
* Modnish Shah
* Bharat Bhushan
