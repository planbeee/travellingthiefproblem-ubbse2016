package service.impl;

import model.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.IFeatureDao;
import service.IFeatureService;

import java.util.List;

@Service
public class FeatureServiceImpl implements IFeatureService {

    @Autowired
    IFeatureDao featureDao;

    public List<Feature> list() {
        return featureDao.list();
    }

    public boolean insert(Feature feature) {
        return featureDao.insert(feature);
    }

    public Feature get(long featureId) {
        return featureDao.get(featureId);
    }
}
