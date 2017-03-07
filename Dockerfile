#FROM bamos/ubuntu-opencv-dlib-torch:ubuntu_14.04-opencv_2.4.11-dlib_19.0-torch_2016.07.12
FROM m4a11205/testface
MAINTAINER Brandon Amos <brandon.amos.cs@gmail.com>

# TODO: Should be added to opencv-dlib-torch image.
#RUN ln -s /root/torch/install/bin/* /usr/local/bin

#RUN apt-get update && apt-get install -y \
#    curl \
#    git \
#    graphicsmagick \
#    python-dev \
#    python-pip \
#    python-numpy \
#    python-nose \
#    python-scipy \
#    python-pandas \
#    python-protobuf\
#    wget \
#    zip \
#    apache2 \
#  	iptables \
#  	nodejs \
#  	python-virtualenv \
#  	python-imaging \
#    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#ADD . /root/openface

#RUN cd ~/openface && \
#    ./models/get-models.sh && \
#    pip2 install -r requirements.txt && \
#    python2 setup.py install && \
#    pip2 install -r demos/web/requirements.txt && \
#    pip2 install -r training/requirements.txt

# Install Flask
# RUN pip install Flask

# Apache site configuration
#ADD chute/000-default.conf /etc/apache2/sites-available/

#  Get the web frontend
#ADD chute/web /var/www/html

# Install files required by the chute.
#
# ADD <path_inside_repository> <path_inside_container>
#
#ADD chute/smarthouse.py /usr/local/bin/smarthouse.py
#ADD chute/LedControl.py /usr/local/bin/LedControl.py
#ADD chute/test_cv.py /usr/local/bin/test_cv.py
#ADD chute/haarcascade_frontalface_default.xml /usr/local/bin/haarcascade_frontalface_default.xml
#ADD chute/yalefaces /usr/local/bin/yalefaces
#ADD chute/run.sh /usr/local/bin/run.sh

EXPOSE 80 81 8010 8011 8012 8500 9000

CMD /bin/bash -l -c '/root/openface/demos/web/start-servers.sh'
CMD ["/bin/bash", "/usr/local/bin/run.sh"]
