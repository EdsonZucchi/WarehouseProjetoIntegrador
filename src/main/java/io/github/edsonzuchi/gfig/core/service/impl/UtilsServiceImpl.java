package io.github.edsonzuchi.gfig.core.service.impl;

import io.github.edsonzuchi.gfig.core.service.UtilsService;
import org.springframework.stereotype.Service;

@Service
public class UtilsServiceImpl implements UtilsService {

    @Override
    public boolean isNullOrBlank(String str) {
        return str == null || str.isEmpty();
    }

    @Override
    public boolean isNullOrBlank(Long str) {
        return str == null || str == 0L;
    }
}
