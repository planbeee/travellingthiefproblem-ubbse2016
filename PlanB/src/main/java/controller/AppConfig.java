package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.sql.SQLException;

@Configuration
@ComponentScan(basePackages = {"repository", "service"})
public class AppConfig {

    @Bean
    public DriverManagerDataSource dataSource() throws SQLException {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/planb");
        dataSource.setUsername("root");
        dataSource.setPassword("cookie");

        return dataSource;
    }

    @Bean(name = "transactionManager")
    @Autowired
    public DataSourceTransactionManager transactionManager(DriverManagerDataSource driverManagerDataSource) {

        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager(driverManagerDataSource);

        return dataSourceTransactionManager;
    }
}
