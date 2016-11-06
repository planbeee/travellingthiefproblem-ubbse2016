package repository;

import model.Feature;

import java.util.List;

public interface IFeatureDao {

    List<Feature> list();

    boolean insert(Feature feature);

    Feature get(long featureId);
}
