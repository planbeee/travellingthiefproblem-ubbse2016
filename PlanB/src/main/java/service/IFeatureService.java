package service;

import model.Feature;

import java.util.List;

public interface IFeatureService {

    List<Feature> list();

    boolean insert(Feature feature);

    Feature get(long featureId);
}

