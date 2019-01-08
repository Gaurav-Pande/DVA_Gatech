// Databricks notebook source
// MAGIC %md
// MAGIC #### Q2 - Skeleton Scala Notebook
// MAGIC This template Scala Notebook is provided to provide a basic setup for reading in / writing out the graph file and help you get started with Scala.  Clicking 'Run All' above will execute all commands in the notebook and output a file 'toygraph.csv'.  See assignment instructions on how to to retrieve this file. You may modify the notebook below the 'Cmd2' block as necessary.
// MAGIC 
// MAGIC #### Precedence of Instruction
// MAGIC The examples provided herein are intended to be more didactic in nature to get you up to speed w/ Scala.  However, should the HW assignment instructions diverge from the content in this notebook, by incident of revision or otherwise, the HW assignment instructions shall always take precedence.  Do not rely solely on the instructions within this notebook as the final authority of the requisite deliverables prior to submitting this assignment.  Usage of this notebook implicitly guarantees that you understand the risks of using this template code. 

// COMMAND ----------

/*
DO NOT MODIFY THIS BLOCK
This assignment can be completely accomplished with the following includes and case class.
Do not modify the %language prefixes, only use Scala code within this notebook.  The auto-grader will check for instances of <%some-other-lang>, e.g., %python
*/
import org.apache.spark.sql.functions.desc
import org.apache.spark.sql.functions._
case class edges(Source: String, Target: String, Weight: Int)
import spark.implicits._

// COMMAND ----------

/* 
Create an RDD of graph objects from our toygraph.csv file, convert it to a Dataframe
Replace the 'toygraph.csv' below with the name of Q2 graph file.
*/

val df = spark.read.textFile("/FileStore/tables/bitcoinalpha.csv") 
  .map(_.split(","))
  .map(columns => edges(columns(0), columns(1), columns(2).toInt)).toDF()

// COMMAND ----------

// Insert blocks as needed to further process your graph, the division and number of code blocks is at your discretion.


// COMMAND ----------

// e.g. eliminate duplicate rows
val n_df = df.distinct()

// COMMAND ----------

// e.g. filter nodes by edge weight >= supplied threshold in assignment instructions
val filtered_df = n_df.filter("weight >= 5")

// COMMAND ----------

// find node with highest in-degree, if two or more nodes have the same in-degree, report the one with the lowest node id
// find node with highest out-degree, if two or more nodes have the same out-degree, report the one with the lowest node id
// find node with highest total degree, if two or more nodes have the same total degree, report the one with the lowest node id
val outdegree_df = filtered_df.groupBy("Source").count().withColumnRenamed("count", "out_degree")
val indegree_df = filtered_df.groupBy("Target").count().withColumnRenamed("count", "in_degree")
val c_df = outdegree_df.join(indegree_df,col("Target") === col("Source"), "full_outer")
val c_df1 = c_df.withColumn("Source", coalesce('Source, lit($"Target"))).withColumn("Target", coalesce('Target, lit($"Source"))).withColumn("out_degree", coalesce('out_degree, lit(0))).withColumn("in_degree", coalesce('in_degree, lit(0)))
val max_out = c_df1.agg(max($"out_degree"))
val max_in = c_df1.agg(max($"in_degree"))
val m = outdegree_df.agg(max($"out_degree"))
val c_df2 = c_df1.withColumn("total_degree", $"in_degree"+$"out_degree")
val total_degree = c_df2.agg(max($"total_degree"))
val c_df3 = c_df2.select("Source", "in_degree","out_degree","total_degree").withColumnRenamed("Source", "Node").orderBy("Node")
val df1 =c_df3.join(max_in,c_df3.col("in_degree").equalTo(max_in.col("max(in_degree)"))).select("Node","in_degree").withColumn("c", lit("i")).withColumnRenamed("in_degree", "d").withColumnRenamed("Node", "v").limit(1)
val df2 = c_df3.join(max_out,c_df3.col("out_degree").equalTo(max_out.col("max(out_degree)"))).select("Node","out_degree").withColumn("c", lit("o")).withColumnRenamed("out_degree", "d").withColumnRenamed("Node", "v").limit(1)
val df3 = c_df3.join(total_degree,c_df3.col("total_degree").equalTo(total_degree.col("max(total_degree)"))).select("Node","total_degree").withColumn("c", lit("t")).withColumnRenamed("total_degree", "d").withColumnRenamed("Node", "v").limit(1)

//val w = Window.partitionBy($"Node")
//val df2 = cf_df3.withColumn("maxIn", max("in_degree").over(w))
 // .filter($"maxIn" === $"in_degree")
 // .drop("in_degree")
 // .withColumnRenamed("maxIn", "in_degree")
//df2.show()
//var a =m
//outdegree_df.filter("out_degree == max(outdegree_df.col("out_degree"))").show()
//c_df1.filter("in_degree == max(in_degree)").show()

//val c_df2 = max2.join(max1, max1("Source") === max2("Source"), "outer").show()


// COMMAND ----------

/*
Create a dataframe to store your results
Schema: 3 columns, named: 'v', 'd', 'c' where:
'v' : vertex id
'd' : degree calculation (an integer value.  one row with highest in-degree, a row w/ highest out-degree, a row w/ highest total degree )
'c' : category of degree, containing one of three string values:
                                                'i' : in-degree
                                                'o' : out-degree                                                
                                                't' : total-degree
- Your output should contain exactly three rows.  
- Your output should contain exactly the column order specified.
- The order of rows does not matter.
                                                
A correct output would be:

v,d,c
2,3,i
1,3,o
2,6,t


whereas:
- Node 1 has highest in-degree with a value of 3
- Node 2 has highest out-degree with a value of 3
- Node 2 has highest total degree with a value of 6
*/


//lstToDf.show()

//val df11 = Seq((df1))
//dfs.show()

val t_result = df1.union(df2)
val result = t_result.union(df3)
//val result = df3.join(t_result,"inner")
//result.show()


// COMMAND ----------

display(result)
