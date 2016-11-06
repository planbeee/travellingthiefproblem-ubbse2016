package repository.dao;

import exception.FeatureEntityException;
import exception.FeatureEntityNotFoundException;
import model.Feature;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Repository;
import repository.IFeatureDao;
import repository.dao.rowmapper.FeatureRowMapper;

import java.util.List;

@Repository
public class FeatureDaoJdbc implements IFeatureDao {

    private Logger LOG = Logger.getLogger(FeatureDaoJdbc.class.getName());

    private JdbcTemplate jdbcTemplate;

    @Autowired
    FeatureRowMapper featureRowMapper;

    @Before
    @Autowired
    public void setDataSource(DriverManagerDataSource dataSource) {

        LOG.info("BEFORE METHOD" + dataSource.getUrl());
        jdbcTemplate = new JdbcTemplate(dataSource);

    }

    public List<Feature> list() {

        String sql = "select id, name, address, details from feature";
        try {

            return jdbcTemplate.query(sql, featureRowMapper);
        } catch (DataAccessException e) {

            LOG.error("Error when trying to list all features.");
            throw new FeatureEntityException("Error when trying to list all features.", e);
        }
    }

    public boolean insert(Feature feature) {

        String sql = "insert into feature(id, name, address, details) values(?, ?, ?, ?)";
        int rows;
        try {

            rows = jdbcTemplate.update(sql, feature.getId(), feature.getName(), feature.getAddress(), feature.getDetails());
        } catch (DataAccessException e) {

            LOG.error("Error when trying to insert a new feature.");
            throw new FeatureEntityException("Error when trying to insert a new feature.", e);
        }

        return rows == 1;
    }

    public Feature get(long featureId) {

        String sql = "select id, name, address, details from feature where id = ?";
        try {

            return jdbcTemplate.queryForObject(sql, featureRowMapper, featureId);
        } catch (EmptyResultDataAccessException e) {

            LOG.error("Error when trying to retrieve a feature. Feature not found.");
            throw new FeatureEntityNotFoundException("Error when trying to retrieve a feature. Feature not found.", e);
        } catch (DataAccessException e) {

            LOG.error("Error when trying to retrieve a feature.");
            throw new FeatureEntityException("Error when trying to retrieve a feature.", e);
        }
    }
}
