from fastai.vision import *
from fastai.metrics import error_rate
from pathlib import Path
from glob2 import glob
from sklearn.metrics import confusion_matrix
import base64
from io import BytesIO
import cv2
from PIL import Image


def pretrained_cnn(img64):
	imgdata=base64.b64decode(str(img64))
    # image=Image.open(io.BytesIO(imgdata))
	path = Path(os.getcwd())/"data"
	learn = load_learner(path)
	img = open_image(io.BytesIO(imgdata))
	pred_class, pred_idx, outputs  = learn.predict(img)
	if outputs[pred_idx].item() <= 0.6:
		return "I am not sure"
	else:
		return pred_class

# img64 = "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"
# print(pretrained_cnn(img64))
