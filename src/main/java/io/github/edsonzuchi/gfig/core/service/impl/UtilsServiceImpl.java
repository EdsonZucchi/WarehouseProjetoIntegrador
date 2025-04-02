package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.service.UtilsService;
import org.springframework.stereotype.Service;

@Service
public class UtilsServiceImpl implements UtilsService {

    @Override
    public boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    @Override
    public boolean isEmpty(Long str) {
        return str == null || str == 0L;
    }

    @Override
    public boolean isEmpty(Float str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Double str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Boolean str) {
        return str == null;
    }

    @Override
    public boolean isEmpty(Integer str) {
        return str == null;
    }
}
