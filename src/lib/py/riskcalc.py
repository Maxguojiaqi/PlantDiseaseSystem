# ---------------------------------------------------------------------------------------------------------
# This script is developed as a sample for Geoprocess using GDAL library 
# Essential library: GDAL, numpy
# Author: Jiaqi Guo(Max)
# Last Modified: 2017-09-18
# ---------------------------------------------------------------------------------------------------------
import os.path
import sys, json, ast
from pathlib import Path
from osgeo import gdal
import ogr, os, osr
from osgeo.gdalnumeric import *
from osgeo.gdalconst import *
import numpy as np


print (sys.argv[1]);
inputList = ast.literal_eval(sys.argv[1]);
print (type(inputList));
print (inputList);
print (inputList[1]);
print (type(inputList[1]));

my_file = "../../../data/riskmap.tif"
if (os.path.exists(my_file)==True):

	os.remove("../../../data/riskmap.tif")
	os.remove("../../../data/riskmap1.tif")

file1 = "../../../data/rain-data.tif"

#Open dataset
bandNum = 1
dis1 = gdal.Open(file1)
band1 = dis1.GetRasterBand(bandNum)



#Read data into numpy array
data = BandReadAsArray(band1)
x = data.shape[0]
y = data.shape[1]
print (x)
print (y)
# numpy.zeros initialize the data, slower
dataCD = np.empty((x,y)) 
dataCD.fill(inputList[0])

# Write to the out file
driver = gdal.GetDriverByName("GTiff")
disOut = driver.Create("../../../data/CropDensity.tif", dis1.RasterXSize, dis1.RasterYSize, 1, band1.DataType)
disOut.SetGeoTransform(dis1.GetGeoTransform())
 #set up the cell size and projection
disOut.SetProjection(dis1.GetProjection())               
CopyDatasetInfo = (dis1, disOut)   
bandOut = disOut.GetRasterBand(1) 
BandWriteArray(bandOut, dataCD)

#Close the datasets
band1 = None
dis1 = None
bandOut= None
disOut = None


