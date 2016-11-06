package repository.dao;

import controller.AppConfig;
import exception.FeatureEntityException;
import exception.FeatureEntityNotFoundException;
import model.Feature;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import repository.IFeatureDao;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
@Transactional
public class FeatureDaoJdbcTest {

    @Autowired
    IFeatureDao featureDao;

    @Test
    public void listAllFeatures() {
        List<Feature> featureList = featureDao.list();
        assertEquals("Error when listing all features.", featureList.size(), 0);
    }

    @Test
    public void insertFeature() {
        final String featureDetails = "FeatureDetails";
        final String featureAddress = "FeatureAddress";
        final String featureName = "FeatureName";
        final long featureId = 123L;
        Feature feature = new Feature(featureId, featureName, featureAddress, featureDetails);

        boolean result = featureDao.insert(feature);
        Feature retrievedFeature = featureDao.get(featureId);

        assertTrue("Error when trying to insert a new feature.", result);
        assertNotNull("Error when trying to insert a new feature.", retrievedFeature);
        assertEquals("Error when comparing the inserted feature with the retrieved one", retrievedFeature.getId(), featureId);
        assertEquals("Error when comparing the inserted feature with the retrieved one", retrievedFeature.getName(), featureName);
        assertEquals("Error when comparing the inserted feature with the retrieved one", retrievedFeature.getDetails(), featureDetails);
        assertEquals("Error when comparing the inserted feature with the retrieved one", retrievedFeature.getAddress(), featureAddress);
    }

    @Test(expected = FeatureEntityException.class)
    public void insertFeaturesWithEntityExceptionDueToDuplicateId() {
        final String featureDetails = "FeatureDetails";
        final String featureAddress = "FeatureAddress";
        final String featureName = "FeatureName";
        final long featureId = 123L;
        Feature feature = new Feature(featureId, featureName, featureAddress, featureDetails);

        featureDao.insert(feature);
        featureDao.insert(feature);
    }

    @Test(expected = FeatureEntityNotFoundException.class)
    public void getFeaturesWithEntityNotFoundException() {
        featureDao.get(123L);
    }
}
