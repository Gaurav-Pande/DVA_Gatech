package edu.gatech.cse6242;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import java.io.IOException;

public class Q4 {

  public static class SourceNodeMapper extends Mapper<Object, Text, Text, IntWritable>{
    private IntWritable out_degree  = new IntWritable(1);
    // assign -1 for indegree so that we can subtract easily later
    private IntWritable in_degree = new IntWritable(-1);
    private Text frame = new Text();
    //implement hte map interface to write our own mapper
    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      String[] column = value.toString().split("\t");
      //String weight = new String();
      //System.out.println(column);
      if(column.length == 2){
        String source = column[0];
        String target = column[1];
        frame.set(source);
        context.write(frame, out_degree);
        frame.set(target);
        context.write(frame,in_degree);
      }
      else{
        System.out.println("wrong parsing of the input");
      }
    }
  }

  public static class CountMapper extends Mapper<Object, Text, Text, IntWritable>{
    private IntWritable result  = new IntWritable(1);
    private Text frame = new Text();
    //implement hte map interface to write our own mapper
    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      String[] column = value.toString().split("\t");
      //String weight = new String();
      //System.out.println(column);
      if(column.length == 2){
        String target = column[1];
        frame.set(target);
        context.write(frame, result);
      }
      else{
        System.out.println("wrong parsing of the input");
      }
    }
  }

  public static class FinalReducer extends Reducer<Text, IntWritable, Text, IntWritable>{
    private IntWritable result = new IntWritable();
    public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException{
           int total = 0;
           for(IntWritable val: values){
             total += val.get();
           }
           result.set(total);
           context.write(key,result);
            }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    // start job a
    Job joba = Job.getInstance(conf, "Q4a");
    joba.setJarByClass(Q4.class);
    joba.setMapperClass(SourceNodeMapper.class);
    joba.setCombinerClass(FinalReducer.class);
    joba.setReducerClass(FinalReducer.class);
    joba.setOutputKeyClass(Text.class);
    joba.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(joba, new Path(args[0]));
    FileOutputFormat.setOutputPath(joba, new Path("Qa"));

    //starts job b, where we will count the number of time out-in appears
    joba.waitForCompletion(true);
    Job jobb = Job.getInstance(conf, "Q4b");
    jobb.setJarByClass(Q4.class);
    jobb.setMapperClass(CountMapper.class);
    jobb.setCombinerClass(FinalReducer.class);
    jobb.setReducerClass(FinalReducer.class);
    jobb.setOutputKeyClass(Text.class);
    jobb.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(jobb, new Path("Qa"));
    FileOutputFormat.setOutputPath(jobb, new Path(args[1]));

    /* TODO: Needs to be implemented */
    System.exit(jobb.waitForCompletion(true) ? 0 : 1);
  }



}
