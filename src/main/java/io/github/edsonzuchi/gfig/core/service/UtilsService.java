package io.github.edsonzuchi.gfig.core.service;

import org.springframework.stereotype.Service;

@Service
public interface UtilsService {

    boolean isNullOrBlank(String str);
    boolean isNullOrBlank(Long str);
}
