package service.impl;

import controller.AppConfig;
import exception.FeatureEntityException;
import model.Feature;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import repository.IFeatureDao;
import service.IFeatureService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
@Transactional
public class FeatureServiceImplTest {

    @InjectMocks
    @Autowired
    IFeatureService featureService;

    @Mock
    @Autowired
    IFeatureDao featureDao;

    @Before
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
    }

    @Test(expected = FeatureEntityException.class)
    public void listFeaturesEntityException() {

        when(featureDao.list()).thenThrow(FeatureEntityException.class);

        featureService.list();
    }

    @Test
    public void insertFeatureSuccessfully() {

        //placeholder ( any(Classname.class) )
        when(featureDao.insert(any(Feature.class))).thenReturn(true);
        boolean result = featureService.insert(new Feature("name", "address", "details"));

        assertTrue("Error when trying to insert a new feature.", result);
    }

    @Test
    public void getFeatureSuccessfully() {

        final long featureId = 123L;
        Feature feature = new Feature(featureId, "name", "address", "details");
        Feature retrievedFeaeture;
        when(featureDao.get(anyLong())).thenReturn(feature);

        retrievedFeaeture = featureService.get(featureId);
        assertEquals("Error when trying to get a feature.", featureId, retrievedFeaeture.getId());
    }

    @Test
    public void insertAndlistAllFeatures() {

        List<Feature> features = new ArrayList<Feature>();
        List<Feature> retrievedFeatures;

        final String featureDetails = "featureDetails";
        final String featureAddress = "featureAddress";
        final String featureName = "featureName";
        final long featureId = 1234L;
        Feature feature = new Feature(featureId, featureName, featureAddress, featureDetails);

        final String featureDetails2 = "featureDetails2";
        final String featureAddress2 = "featureAddress2";
        final String featureName2 = "featureName2";
        final long featureId2 = 123499L;
        Feature feature2 = new Feature(featureId2, featureName2, featureAddress2, featureDetails2);

        features.add(feature);
        features.add(feature2);

        //mocking the call
        //when featureDao.list() is called, mockito will return features list
        //(featureDao.list() will not be executed if it is mocked)
        when(featureDao.list()).thenReturn(features);

        retrievedFeatures = featureService.list();
        //verifi if the method is called
        verify(featureDao, times(1)).list();

        assertEquals("Error when inserting and listing all features.", 2, retrievedFeatures.size());
    }
}
