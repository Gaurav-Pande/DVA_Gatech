package edu.gatech.cse6242;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.KeyValueTextInputFormat;
import java.io.IOException;


public class Q1 {
public static class SourceNodeMapper extends Mapper<Object, Text, Text, IntWritable>{
  private IntWritable w = new IntWritable(1);
  private Text word = new Text();
  //implement hte map interface to write our own mapper
  public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
    String[] column = value.toString().split("\t");
    //String weight = new String();
    //System.out.println(column);
    if(column.length == 3){
      String source = column[0];
      String target = column[1];
      String weight =  column[2];
      w = new IntWritable(Integer.parseInt(weight));
      word.set(source);
      context.write(word,w);
    }
    else{
      System.out.println("wrong parsing of the input");
    }


  }
}

public static class MaxReducer extends Reducer<Text, IntWritable, Text, IntWritable>{
  private IntWritable result = new IntWritable();
  public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException{
          int maximum = 0;
          for(IntWritable val: values){
            IntWritable value = new IntWritable();
            value = val;
            //val = Integer.parseInt((val.toString()));
            if (value.get() > maximum){
              maximum = value.get();
            }
          }

          if (maximum != 0){
            result.set(maximum);
            context.write(key,result);
          }


          }

}




public static void main(String[] args) throws Exception {
  Configuration conf = new Configuration();
  Job job = Job.getInstance(conf, "Q1");
  /* TODO: Needs to be implemented */
    job.setJarByClass(Q1.class);
    job.setMapperClass(SourceNodeMapper.class);
    job.setCombinerClass(MaxReducer.class);
    job.setReducerClass(MaxReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
  FileInputFormat.addInputPath(job, new Path(args[0]));
  FileOutputFormat.setOutputPath(job, new Path(args[1]));
  System.exit(job.waitForCompletion(true) ? 0 : 1);
}



}
