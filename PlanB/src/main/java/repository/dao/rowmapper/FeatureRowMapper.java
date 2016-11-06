package repository.dao.rowmapper;

import model.Feature;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class FeatureRowMapper implements RowMapper<Feature> {

    public Feature mapRow(ResultSet resultSet, int i) throws SQLException {

        long id = resultSet.getLong("id");
        String name = resultSet.getString("name");
        String address = resultSet.getString("address");
        String details = resultSet.getString("details");

        return new Feature(id, name, address, details);
    }
}
